const express = require('express');
const fs = require('fs');

const PRODUCTS_FILE = './data/products.json';

// Helper function to read products from file
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
};

// Helper function to write products to file
const writeProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

const productRouter = (io) => {
    const router = express.Router();

    // Listar todos los productos con una limitación opcional
    router.get('/', (req, res) => {
        const products = readProducts();
        const limit = parseInt(req.query.limit) || products.length;
        res.json(products.slice(0, limit));
    });

    // Traer un producto por su ID
    router.get('/:pid', (req, res) => {
        const products = readProducts();
        const product = products.find(p => p.id === parseInt(req.params.pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });

    // Agregar un nuevo producto
    router.post('/', (req, res) => {
        const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
        const products = readProducts();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        if (!title || !description || !code || !price || stock === undefined || !category) {
            return res.status(400).send('All fields except thumbnails are required');
        }

        products.push(newProduct);
        writeProducts(products);
        io.emit('updateProducts', products);
        res.status(201).json(newProduct);
    });

    // Actualizar un producto por su ID
    router.put('/:pid', (req, res) => {
        const products = readProducts();
        const product = products.find(p => p.id === parseInt(req.params.pid));
        if (product) {
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;

            if (title) product.title = title;
            if (description) product.description = description;
            if (code) product.code = code;
            if (price) product.price = price;
            if (status !== undefined) product.status = status;
            if (stock !== undefined) product.stock = stock;
            if (category) product.category = category;
            if (thumbnails) product.thumbnails = thumbnails;

            writeProducts(products);
            io.emit('updateProducts', products);
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });

    // Eliminar un producto por su ID
    router.delete('/:pid', (req, res) => {
        let products = readProducts();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            writeProducts(products);
            io.emit('updateProducts', products);
            res.status(204).send();
        } else {
            res.status(404).send('Product not found');
        }
    });

    return router;
};

module.exports = productRouter;
