import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import summaryApi from "../common/index";
const CategoryList = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProducts = async () => {
    const response = await fetch(summaryApi.productCategory.url);
    const dataresponse = await response.json();
    console.log("response:", dataresponse.data);
    setCategoryProducts(dataresponse.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <div className="w-100vw bg-slate-600  p-4 overflow-x-scroll">
      <div className="flex gap-2   justify-between items-center">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 " key={index}></div>
              );
            })
          : categoryProducts.map((product, index) => {
              return (
                <Link
                  to={"/category-product/" + product?.category}
                  className=""
                  key={index}
                >
                  <div className="h-20 w-20 flex justify-center rounded-full overflow-hidden p-3 bg-white cursor-pointer  ">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-fill p-1 hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center  capitalize cursor-pointer text-lg text-white">
                    {product?.category}
                  </p>
                 
                </Link>
              );
              
            })}
      </div>

    </div>
    
  );
};

export default CategoryList;
