import { useEffect, useState , useContext} from "react";
import summaryApi from "../common/index.jsx";
import Context from "../context/index.js"; 
import currency from '../helpers/Currency.jsx'
import { MdDelete } from "react-icons/md";
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
 
  const itemsInCart =  context.cartProductCount;
  console.log("itemsInCart:", itemsInCart);
  const loadingcart = new Array(itemsInCart).fill(null);
  

  const fetchdata = async () => {
    // setLoading(true);
    const response = await fetch(summaryApi.viewAddToCart.url, {
      method: summaryApi.viewAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
      setLoading(false);
    }
    
   
    console.log("cartData:", responseData.data);
    
  };
  
   useEffect(() => {
    console.log("Updated cartData:", data); 
  }, [data]);

  useEffect(() => {
    fetchdata();
  }, []);

  const increseCartProductQuantity = async (productId, quantity) => {
    const response = await fetch(summaryApi.updateCartProductQuantity.url, {
      method: summaryApi.updateCartProductQuantity.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id : id,
        quantity: quantity + 1,
      }),

    })
  const responseData = await response.json();

  if(responseData.success){
    fetchdata()
  }
  };
  const decreseCartProductQuantity = async (productId, quantity) => {
    if(quantity>1){
      const response = await fetch(summaryApi.updateCartProductQuantity.url, {
        method: summaryApi.updateCartProductQuantity.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id : id,
          quantity: quantity - 1,
        }),
  
      })
    const responseData = await response.json();
  
    if(responseData.success){
      fetchdata()
    }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3 ">
      {data.length === 0 && loading && (
  <p className="bg-white py-4">Cart is empty</p>
)}
</div>

        <div className="flex flex-col lg:flex-row gap-10 lg:justify-evenly p-4 ">
          {/* view product */}

          <div className=" w-full max-w-3xl ">
            {
              loading ? (
                loadingcart.map(el => {
                  return(
                    <div key={el+'itemsInCart'} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse">
                    </div>
                  )
                })

              ):(  
               data.map((product,index) =>{
                return(
                  <div key={product._Id +'itemsIwenCart' + index } className="w-full bg-white h-32 my-2  grid grid-cols-[128px,1fr] ">
                    <div className="h-32 w-32 bg-slate-200">
                      <img src={product?.productId?.productImage[0]} alt="" className=" h-full w-full object-scale-down mix-blend-multiply"/>
                    </div>
                    
                    <div className=" px-4 py-2 relative">
                    <div className=" absolute right-3 text-red-600 rounded-full p-2 text-3xl hover:bg-red-600 hover:text-white cursor-pointer">
                    <MdDelete />
                    </div>
                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                      <p className=" capitalize text-slate-500">{product?.productId?.category}</p>
                      <p className="text-green-700 font-medium text-lg ">{currency(product?.productId?.sellingprice)}</p>
                      <div className="flex items-center gap-3 mt-1">

                        <button onClick={()=>{decreseCartProductQuantity(product?._id,product?.quantity)}} className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded">-</button>

                        <span>{product?.quantity}</span>

                        <button onClick={()=>{increseCartProductQuantity(product?._id,product?.quantity)}} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded">+</button>
                      </div>
                    </div>
                    
                    </div>
                )
               })
               
              )

            }
            </div>
            {/* total product */}
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {
              loading ? (
                <div className="h-36 bg-slate-300 border-slate-200 animate-pulse">
                   
                </div>
              ) : (
                <div className="h-36 bg-white ">
               Total 
                </div>
              )
            }
</div>


        </div>
      
    </div>
  );
};

export default Cart;
