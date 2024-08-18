import addToCartModel from "../../models/cartProductModel.js";

const countAddToCartProduct = async (req, res) => {
try {
    const currentUser = req.userID;
    if (!currentUser) {
        return res.status(400).json({
            message: "User ID is required",
            error: true,
            success: false
        });
    }
console.log("currentUser",currentUser);
    const countProduct = await  addToCartModel.countDocuments({
        userID: currentUser

    });

    res.json({
        data: {
            count: countProduct
        },
        error: false,
        success: true
    })
} catch (error) {
    return res.status(500).json({
        message: error.message || error.toString(),
        error: true,
        success: false
    });
    
}

}

export default countAddToCartProduct;