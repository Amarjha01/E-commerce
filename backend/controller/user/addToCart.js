import addToCartModel from '../../models/cartProductModel.js';

const addToCartController = async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        const currentUser = req.userID;

        const isProductisExist = await addToCartModel.findOne({productId: productId});
        const payload = {
            productId : productId,
            quantity : 1,
            userId: currentUser
        }

        if(isProductisExist){
            res.json({
                message: 'Product already in cart',
                error: false,
                success: true
            })
        }

        const newProduct = new addToCartModel(payload);
        const savedProduct = await newProduct.save();

        res.jason({
            data : savedProduct,
            message: 'Product added to cart',
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
             message: error.message || error.toString(),
             error: true,
             sucess: false
             });
        
    }
}

export default addToCartController;