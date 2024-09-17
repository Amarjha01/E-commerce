import addToCartModel from "../../models/cartProductModel.js";

const deleteAddToCartProduct = async (req, res) => {
    try {
       
        const AddToCartProductId = req.body._id;

        const deleteProduct = await addToCartModel.deleteOne({_id : AddToCartProductId});
        res.status(201).json({
            message : 'Product deleted successfully',
            success : true,
            error : false,
            data : deleteProduct
        })


    } catch (error) {
        res.status(404).json({
        message : error.message || error,
        success : false,
        error : true
        })
    }

}

export default deleteAddToCartProduct;