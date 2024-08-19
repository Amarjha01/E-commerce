import Cart from '../../models/cartProductModel.js';

const viewAddToCart = async (req, res) => {
    try {
        const currentUser = req.userId;

        const cartDetails = await Cart.findOne({ userId: currentUser });

        res.status(200).json({
            message: 'Cart details fetched successfully',
            success: true,
            error: false,
            data: cartDetails,
        })
        console.log("cartDetails:" , cartDetails);
    } catch (error) {
        res.status(500).json({ 
            message: error?.message || error,
            sucess: false ,
            error: true
        });
        
    }
};

export default viewAddToCart;