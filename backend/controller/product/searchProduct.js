import ProductModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {

    const query = req.query.q;
    const regex = RegExp(query,'i','g');
    const searchedProduct = await ProductModel.find({
      '$or':[
        {
          brandName: regex
        },
        {
          category: regex
        },
        {
          productName: regex
        },
      ]
    })

    res.status(200).json({
      message: "searchedProduct list",
      data: searchedProduct,
    });
  } catch (error) {
    res.status(400).json({
      err: error.message,
    });
  }
};
export default searchProduct;