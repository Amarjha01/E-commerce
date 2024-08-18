import addToCartModel from '../../models/cartProductModel.js';

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const currentUser = req.userID;

        // Check if the product already exists in the cart for the current user
        const isProductExist = await addToCartModel.findOne({ productId: productId, userId: currentUser });

        if (isProductExist) {
            // If the product is already in the cart, send a response and return immediately
            return res.json({
                message: 'Product already in cart',
                error: false,
                warning: true,
                success: false
            });
        }

        // If the product is not in the cart, add it
        const payload = {
            productId: productId,
            quantity: quantity || 1, // Default to 1 if quantity is not provided
            userId: currentUser
        };

        const newProduct = new addToCartModel(payload);
        const savedProduct = await newProduct.save();

        // Send the response after the product is added
        return res.json({
            data: savedProduct,
            message: 'Product added to cart',
            error: false,
            success: true
        });

    } catch (error) {
        // Handle errors and send a 500 response if something goes wrong
        return res.status(500).json({
            message: error.message || error.toString(),
            error: true,
            success: false
        });
    }
};

export default addToCartController;
