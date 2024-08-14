import Product from '../models/productModel.js';
import uploadProductPermission from '../helper/permission.js';
const updatedProductDetailController = async (req, res) => {
    
try {
  
    const {_id , ...resBody}= req.body;
    console.log("id :",_id,"resBody:",resBody)
    const updateProduct = await Product.findByIdAndUpdate(_id, resBody);
    
    res.status(200).json({
        message: "Product updated successfully",
        data: updateProduct,
        error: false,
        success: true
    });

} catch (error) {
    res.status(500).json({
         message: error.message,
         sucess: false,
         error: true
         });
}
}
export default updatedProductDetailController;