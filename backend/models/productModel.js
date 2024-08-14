import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingprice: Number
} ,{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;