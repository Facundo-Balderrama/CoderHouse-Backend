import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }, 
    thumbnails: { type: Array, required: false }
});

productSchema.plugin(aggregatePaginate);

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
    }
  })

const productModel = mongoose.model('products', productSchema);

export default productModel;