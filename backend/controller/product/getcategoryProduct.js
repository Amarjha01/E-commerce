import productModel from "../../models/productModel.js";

const getCategoryProduct = async (req, res) => {
try {
    const productCategory = await productModel.distinct('category');
    

    const productByCategory = [];

    for (const category of productCategory) {
        const product = await productModel.findOne({category})
        // console.log('product:', product);
        if(product){
            productByCategory.push(product);    
        }
    };


    res.json({
        message: 'Product Category',
        success: true,
        error: false,
        data: productByCategory
    });
} catch (error) {
    res.status(400).json({
         message: error.message,
         sucess: false,
         error: true
         });
}
};
export default getCategoryProduct;