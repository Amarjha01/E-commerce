import Cart from "../../models/cartProductModel.js";

const viewAddToCart = async (req, res) => {
  try {
    const currentUser = req.userID;
    console.log("currentUser:", currentUser);
    const cartDetails = await Cart.find({
      userId: currentUser,
    }).populate("productId");

    res.status(200).json({
      message: "Cart details fetched successfully",
      success: true,
      error: false,
      data: cartDetails,
    });
    // console.log("cartDetails:", cartDetails);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      sucess: false,
      error: true,
    });
  }
};

export default viewAddToCart;
