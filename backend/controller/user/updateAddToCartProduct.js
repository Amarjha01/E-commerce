import addToCartModel from "../../models/cartProductModel.js";

const updateAddToCartProduct = async (req, res) => {
  try {

    const currentUserId = req.userId;
    const productId  = req.body._id;
    const qty = req.body.quantity;
    const updateProductQuantity = await addToCartModel.updateOne({_id : productId},{
        ...(qty &&{quantity: qty})
    });

    res.status(201).json({
        message: 'quantity updated sucessfully',
        success: true,
        error: false,
        data: updateProductQuantity,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
     
    });
  }
};

export default updateAddToCartProduct;