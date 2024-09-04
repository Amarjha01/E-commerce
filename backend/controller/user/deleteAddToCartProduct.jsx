const deleteAddToCartProduct = async (req, res) => {
    try {
        const  CurrentUserId = req.userId;
        const AddToCartProductId = req.params._id;
    } catch (error) {
        res.status(404).json({
        message : error.message || error,
        success : false,
        error : true
        })
    }

}