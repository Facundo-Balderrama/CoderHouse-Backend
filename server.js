const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const productRouter = require('./routes/products');
const viewRouter = require('./routes/views');
const path = require('path');
const fs = require('fs');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;

const PRODUCTS_FILE = path.join(__dirname, './data/products.json');

// 
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
};

// 
const writeProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/products', productRouter);
app.use('/', viewRouter);

// Manejo de conexión con WebSockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('newProduct', (product) => {
        const { title, description, code, price, stock, category, thumbnails } = product;
        const products = readProducts();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails
        };

        if (!title || !description || !code || !price || stock === undefined || !category) {
            socket.emit('error', 'All fields except thumbnails are required');
            return;
        }

        products.push(newProduct);
        writeProducts(products);
        io.emit('updateProducts', newProduct); // Emitir evento de WebSocket
    });

    socket.on('deleteProduct', (productId) => {
        let products = readProducts();
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            writeProducts(products);
            io.emit('removeProduct', productId); // Emitir evento de WebSocket
        } else {
            socket.emit('error', 'Product not found');
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = io;
