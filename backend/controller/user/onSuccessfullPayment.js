import cartModel from '../../models/cartProductModel.js';


const onSuccessfullPayment = async (req, res) => {
    try {
        const currentUser = req.userID;
        console.log('onSuccessCurrentUser:', currentUser);
        // Fetch the cart items from the database

        const cartItems = await cartModel.deleteMany({ userId: currentUser });
        res.status(200).json({ 
            success: true, 
            message: 'Cart items deleted successfully', 
            data: cartItems
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message
        });
    }
}

export default onSuccessfullPayment;