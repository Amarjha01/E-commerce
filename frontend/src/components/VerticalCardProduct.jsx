import { TiShoppingCart } from "react-icons/ti";

import { Link } from "react-router-dom";

import React, { useState, useEffect, useContext } from "react";
import Currency from '../helpers/Currency.jsx'
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import addToCart from "../helpers/addToCart";
import Context from "../context/index.js";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const {fetchUserAddToCart} = useContext(Context);
  const handleAddToCart = async (e,id) => {
    await addToCart(e,id);
    await fetchUserAddToCart();
  }

  
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
    <div className="container  mx-auto px-4 py-4 ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6 overflow-scroll">
      {
        loading ?(
            loadingList.map((product, index) => {
                return (
                  <div
                    className="w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px]  bg-white  animate-pulse rounded-sm shadow-lg  cursor-pointer"
                    key={index + 1}
                  >
                    <div className="bg-slate-500 animate-pulse h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center">
                      
                    </div>
                   <div className="p-4 grid gap-2">
                   <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse py-4 "></h2>
                   <p className="capitalize bg-slate-200 animate-pulse py-4  text-slate-500"></p>
                   <div className="flex gap-3">
                    <p className="text-green-600 font-medium animate-pulse ">{Currency(product?.sellingprice)}</p>
                    <p className="text-slate-300 line-through animate-pulse">{Currency(product?.price)}</p>
                   </div>
                   <button className="bg-slate-500 animate-pulse py-4 px-3 rounded-full text-white text-center text-sm hover:scale-105 transition-all"></button>
                   </div>
                  </div>
                );
              }
            )
        ) : (
            data.map((product, index) => {
                return (
                  <Link to={"product/" + product?._id}
                    className="w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px]  bg-white rounded-sm shadow-lg  cursor-pointer"
                    key={index + 1}
                  >
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center">
                      <img src={product.productImage[0]} alt="" className="h-full hover:scale-110 transition-all mix-blend-multiply "/>
                    </div>
                   <div className="p-4 grid gap-2">
                   <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">{product?.productName}</h2>
                   <p className="capitalize text-slate-500">{product?.category}</p>
                   <div className="flex gap-3">
                    <p className="text-green-600 font-medium ">{Currency(product?.sellingprice)}</p>
                    <p className="text-slate-300 line-through">{Currency(product?.price)}</p>
                   </div>
                   <button className="bg-red-500 hover:bg-red-700 py-1 px-3 rounded-full text-white text-center text-sm hover:scale-105 transition-all"onClick={(e) => {
                        addToCart(e, product?._id);
                      }}>Add to cart</button>
                   </div>
                  </Link>
                );
              })
        )
    } 
      </div>
    </div>
  );
};

export default VerticalCardProduct;
