const express = require('express');
const fs = require('fs');
const router = express.Router();

const PRODUCTS_FILE = './data/products.json';


const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
};

// Ruta para la vista home
router.get('/', (req, res) => {
    const products = readProducts();
    res.render('home', { products });
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    const products = readProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;
