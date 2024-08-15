
import { Router } from 'express';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {

        const { limit = 10, page = 1, sort, category = 'all', status = 'all'} = req.query;

        const filter = {}
       
        if (category && category !== 'all') {
            filter.category = category;
        }

        if (status && status !== 'all') {
            filter.status = status === 'available';
        }

        const aggregation = [
            { $match: filter },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    code: 1,
                    price: 1,
                    stock: 1,
                    category: 1,
                    thumbnails: 1,
                }
            }
        ];
 
        if (sort) {
            const sortOrder = sort === 'desc' ? -1 : 1;
            aggregation.push({ $sort: { price: sortOrder } });
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const aggregate = productModel.aggregate(aggregation);
        const result = await productModel.aggregatePaginate(aggregate, options);

        res.render('home', { 
            products: result.docs,
            pagination: {
                totalProducts: result.totalDocs,
                totalPages: result.totalPages,
                currentPage: result.page,
                pageSize: result.limit
            },
            category: category || 'all',
            sort: sort || '',
            status: status || 'all',
            limit: limit,
            page: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading products file', error: error.message });
    }
});



router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        res.render('product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading products file', error: error.message });
    }
})


router.get('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid)

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        res.render('cart', { cart, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading products file', error: error.message });
    }
});

export default router;