import productModel from '../models/productModel.js'
import uploadProductPermission from '../helper/permission.js';
async function uploadProductController(req,res) {
    try {
        const sessionUserId = req.userID;
        const hasPermission = await uploadProductPermission(sessionUserId);
        if(!hasPermission){
            throw new Error('You are not authorized to upload product');
        }
        const newUploadProduct = await new productModel(req.body);
        const saveProduct = await newUploadProduct.save();
        res.status(200).json({ 
            message: "Product uploaded successfully",
            data: saveProduct,
            error: false,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });        
    }
}
export default uploadProductController;

// import productModel from '../models/productModel.js';
// import uploadProductPermission from '../helper/permission.js';
// async function uploadProductController(req, res) {
//     try {
//         const sessionUserId = req.userID;
//         // Check if the user has permission to upload a product
//         const hasPermission = await uploadProductPermission(sessionUserId);
//         if (!hasPermission) {
//             throw new Error('You are not authorized to upload product');
//         }
//         // Create a new product instance using the data from the request body
//         const newProduct = new productModel(req.body);
//         // Save the new product to the database
//         const saveProduct = await newProduct.save();
//         // Respond with success
//         res.status(200).json({
//             message: "Product uploaded successfully",
//             data: saveProduct,
//             error: false,
//             success: true,
//         });
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

// export default uploadProductController;
