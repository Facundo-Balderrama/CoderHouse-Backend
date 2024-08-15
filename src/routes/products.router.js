import { Router } from 'express';
import productModel from '../models/product.model.js';

const router = Router();


//Get
router.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error reading products file', error: error.message});
    }
});

//Get by id
router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error reading products file', error: error.message });
    }
});

//Post
router.post('/', async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error saving new product', error: error.message });
    }
});

//Put
router.put('/:pid', async (req, res) => {
    const id = req.params.pid;

    try {
        const product = await productModel.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(201).json({message: 'product updated'});
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

//Delete product by id
router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(204).json({message: 'product deleted'});

    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

export default router;