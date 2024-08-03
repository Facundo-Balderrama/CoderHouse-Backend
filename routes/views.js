const express = require('express');
const fs = require('fs');
const router = express.Router();

const PRODUCTS_FILE = './data/products.json';

// Helper function to read products from file
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(data);
};

router.get('/home', (req, res) => {
    const products = readProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    const products = readProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;
