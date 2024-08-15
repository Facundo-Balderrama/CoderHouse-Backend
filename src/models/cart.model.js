import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true },
}); 

const cartSchema = new mongoose.Schema({
    products: [cartProductSchema],
    timestamp: { type: Date, default: Date.now },
});

// Populating products before every find operation
cartSchema.pre('find', function() {
    this.populate('products.product');
});

cartSchema.pre('findOne', function() {
    this.populate('products.product');
});

// Custom transformation to remove unnecessary fields and handle undefined/null cases
cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;

        if (returnedObject.products) {
            returnedObject.products = returnedObject.products.map(item => {
                if (item.product) { // Check if item.product exists
                    delete item.product.__v;
                    delete item.product.description;
                    delete item.product.thumbnails;
                    delete item.product.status;
                    delete item.product.stock;
                }
                delete item._id;
                return item;
            });
        }
    }
});

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;