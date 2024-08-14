import productModel from "../../models/productModel.js";

const CategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });
    res.json({
      data: product,
      message: "product category",
      sucess:true,
      error:false
    });

    console.log(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
export default CategoryWiseProduct;
