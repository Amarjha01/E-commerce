import e from 'express';
import ProductModel from '../../models/productModel.js';

const getProductDetails = async (req, res) => {
    try {
        const {productId} = req.body;
        const productData = await ProductModel.findById(productId);
        res.json({
            message: 'Product details fetched successfully',
            success: true,
            data: productData
        });
    } catch (error) {
        res.status(500).json({ 
            message: error?.message || error,
            sucess: false,
            error: true
         });
    }
}
export default getProductDetails;