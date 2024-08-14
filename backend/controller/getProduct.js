import Product from '../models/productModel.js'

const getProductController = async (req, res) => {
    try {

        const allProduct = await Product.find();
      
        res.status(200).json({
            message: "All Product",
            success: true,
            error: false,
            data: allProduct
        });
    } catch (error) {
        res.status(500).json({
             message: error.message,
             sucess: false,
             error: true
             });
        
    }
}
export default getProductController;