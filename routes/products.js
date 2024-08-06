const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const io = require('../server'); // Importa la instancia de socket.io

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// 
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
};

// 
const writeProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

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
    io.emit('updateProducts', newProduct); // Emitir evento de WebSocket
    res.status(201).json(newProduct);
});

// Eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
    let products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        writeProducts(products);
        io.emit('removeProduct', parseInt(req.params.pid)); // Emitir evento de WebSocket
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;
