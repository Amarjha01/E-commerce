import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import productCategory from "../helpers/ProductCategory";
import uploadImage from "../helpers/uploadImages";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "../components/DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common";
import {toast} from "react-toastify";

const UploadProduct = ({ onClose,onUploadSuccess }) => {
  const [data, setData] = React.useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingprice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const uploadIamgeCloudinary = await uploadImage(file);
    console.log("uploadImageCloudinary:", uploadIamgeCloudinary);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadIamgeCloudinary.url],
    }));
  };

  const handleProductDelete = async (index) => {
    let productImage = [...data.productImage];
    productImage.splice(index, 1);

    return setData((prev) => ({
      ...prev,
      productImage: productImage,
    }));
  }; 


const handleSubmit = async(productData)=>{
productData.preventDefault();
// console.log("productData:",data);

const response = await fetch(summaryApi.uploadProduct.url,{
  method: summaryApi.uploadProduct.method,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
  
})
const uploadProductResponse = await response.json();
if(uploadProductResponse.success){
  toast.success(uploadProductResponse?.message);
  onClose();
  onUploadSuccess();
}

if(uploadProductResponse.error){
  toast.error(uploadProductResponse?.message);
}
console.log("response:",uploadProductResponse);
}

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-gray-900 bg-opacity-45 h-full w-full flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <h2 className="font-bold text-lg "> Upload Product</h2>
          <div className="w-fit ml-auto text-2xl hover:text-red-800 cursor-pointer ">
            <MdClose onClick={onClose} />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full" onSubmit={handleSubmit}>
          <label htmlFor="productName" className="mt-2">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            name="productName"
            value={data.productName}
            required
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="brandName" className="mt-2">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brandName name"
            name="brandName"
            value={data.brandName}
            required
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="category" className="mt-2">
            Category:
          </label>
          <select
            value={data.category}
            name="category"
            id="category"
            onChange={handleChange}
            required
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Selecct Category</option>
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-2">
            product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
              <div className="flex flex-col justify-center items-center cursor-pointer gap-2">
                <FaCloudUploadAlt className="text-5xl" />
                <p>Upload Product Image</p>
                {/* <p>{uploadProductImageInput}</p> */}
                <input
                  type="file"
                  id="uploadImageInput"
                  required
                  name="productImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 flex-wrap">
                {data.productImage.map((el, index) => {
                  console.log("el:", el, "index:", index);
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        height={80}
                        width={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullScreenImage(true);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 cursor-pointer p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                        onClick={() => handleProductDelete(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="Price" className="mt-2">
            Price :
          </label>
          <input
            type="number"
            id="Price"
            placeholder="enter product price"
            name="price"
            value={data.price}
            required
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="selling Price" className="mt-2">
            {" "}
            Selling Price :
          </label>
          <input
            type="number"
            id="SellingPrice"
            placeholder="enter product selling price"
            name="sellingprice"
            value={data.sellingprice}
            required
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="description" className="mt-2">
          Description :
          </label>

          <textarea
            id="description"
            placeholder="enter product description"
            name="description"
            value={data.description}
            required
            onChange={handleChange}
            className="p-2 h-24 bg-slate-100 border rounded"
          >
          </textarea>
          <button className="py-1 px-3 bg-red-600 mb-10 hover:bg-red-700 rounded-full text-white font">
            Upload product
          </button>
        </form>
      </div>
      {/* display image full screen */}

      {openFullScreenImage && (
        <DisplayImage
          imgurl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
