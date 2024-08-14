import React from "react";
import { useState, useEffect } from "react";

import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import summaryApi from "../common";
const AllProducts = () => {
  const [OpenproductsPanel, SetOpenproductsPanel] = useState(false);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const fetchProducts = async () => {
    const fetchProductsResponse = await fetch(summaryApi.AllProduct.url);
    const responseData = await fetchProductsResponse.json();
    setDisplayProducts(responseData?.data || []);
  };
  useEffect(() => {
    fetchProducts();
  }, [refresh]); // Refresh when `refresh` state changes

  const handleProductUploadSuccess = () => {
    setRefresh(prev => !prev); // Toggle refresh state to trigger re-fetch
  };



  // fetchProducts();
  return (
    <div className="">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600  font-bold text-red-600 hover:bg-red-600 hover:text-white py-2 px-4 rounded-full transition-all"
          onClick={() => {
            SetOpenproductsPanel(true);
          }}
        >
          Upload product
        </button>
      </div>

      {/* display all products */}
      <div className="flex flex-wrap items-center gap-3 py-4 h-[calc(100vh-230px)] overflow-y-scroll ">
        
        {displayProducts.map((product, index) => {
          return (
            <AdminProductCard key={index} product={product} fetchData={fetchProducts} />
              )
        })}
      </div>

      {/* Upload-product */}
      {OpenproductsPanel && (
        <UploadProduct onClose={() => SetOpenproductsPanel(false)} 
        onUploadSuccess={handleProductUploadSuccess} // Pass the callback
        />
      )}
    </div>
  );
};

export default AllProducts;
