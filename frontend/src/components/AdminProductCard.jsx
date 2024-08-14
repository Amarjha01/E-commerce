import { MdEdit } from "react-icons/md";
import { useState } from "react";
import AdminEditProduct from "../components/AdminEditProduct";
import Currency from "../helpers/Currency";
const AdminProductCard = ({ index, product ,fetchData }) => {
  const [openEditProductPanel, setOpenEditProductPanel] = useState(false); // Provide an initial value for the state
  return (
    <div className="cursor-pointer bg-white p-3 rounded  border border-black ">
     <div className="w-40">
    <div className="w-32 h-32 felx justify-center items-center">
    <img
        src={product?.productImage[0] || []}
        alt="Product Image"
       
        className="object-fill m-auto h-full"
      />
    </div>
      <h2 className="text-ellipsis line-clamp-2">{product.productName}</h2>
    <div>
      <p className="font-semibold">
      {
        Currency(product.sellingprice)
      }
      </p>
    <div
        className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white"
        onClick={() => {
          setOpenEditProductPanel(true);
        }}
      >
        <MdEdit />
      </div>
    </div>
     </div>

      {openEditProductPanel && (
        <AdminEditProduct
          onClose={() => setOpenEditProductPanel(false)}
          key={index}
          product={product}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
