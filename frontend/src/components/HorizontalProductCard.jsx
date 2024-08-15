import React, { useState, useEffect } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
const HorizontalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryWiseProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryWiseProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container bg-yellow-600 mx-auto px-4 py-2 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      {data.map((product, index) => {
        return (
          <div
            className="w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
            key={index + 1}
          >
            <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
              <img src={product.productImage[0]} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalProductCard;
