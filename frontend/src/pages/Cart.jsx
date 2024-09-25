import { useEffect, useState, useContext } from "react";
import summaryApi from "../common/index.jsx";
import Context from "../context/index.js";
import currency from "../helpers/Currency.jsx";
import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";
// import PaymentGetway from "./PaymentGetway.jsx";

const onSuccessPayment = async (req, res) => {
  const response = await fetch(summaryApi.onSuccessfullPayment.url, {
    method: summaryApi.onSuccessfullPayment.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  }


  const initiatePayment = async () => {
    try {
      // Await the fetch to complete
      const response = await fetch(summaryApi.paymentGetway.url, {
        method: summaryApi.paymentGetway.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        }
      });
  
      // Parse the response as JSON
      const responseData = await response.json();
  
      // Log the parsed response data
      console.log('responseData:', responseData);
  
      // If the response contains a redirect URL, perform the redirection
      if (responseData.success && responseData.url) {
        const redirectUrl = responseData.url;
        console.log('Redirecting to:', redirectUrl);
        
        // Perform the redirection
        window.location.href = redirectUrl;
        onSuccessPayment();
        Cart();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


const Cart = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const context = useContext(Context);

  const itemsInCart = context.cartProductCount;
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
      if (responseData.data.length === 0) {
        setIsEmptyCart(true);
      } else {
        setIsEmptyCart(false);
      }
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
        _id: productId,
        quantity: quantity + 1,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchdata();
    }
  };
  const decreseCartProductQuantity = async (productId, quantity) => {
    if (quantity > 1) {
      const response = await fetch(summaryApi.updateCartProductQuantity.url, {
        method: summaryApi.updateCartProductQuantity.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: productId,
          quantity: quantity - 1,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchdata();
      }
    }
  };

  const deleteCartProduct = async (productId) => {
    const response = await fetch(summaryApi.deleteCartProduct.url, {
      method: summaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    });
    fetchdata();
    context.fetchUserAddToCart();
  };
  const totalQnty = data.reduce((prev, current) => prev + current.quantity, 0);
  const totalPrice = data.reduce((prev, current) => prev + current.productId.sellingprice * current.quantity,0);
  const priceBeforeTax = totalPrice - (18/100)*totalPrice;
  const total = totalPrice  + 40 - 200;

    // Render empty cart message if the cart is empty
    if (isEmptyCart) {
      return (
        <div className="container mx-auto text-center text-lg my-3">
          <p className="bg-white py-4">Your cart is empty</p>
        </div>
      );
    }


  return (
    <Context.Provider value={totalQnty}>
     
      <div className="container mx-auto">
        <div className="text-center text-lg my-3 ">
          {data.length === 0 && loading && (
            <p className="bg-white py-4">Cart is empty</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:justify-evenly p-4 ">
          {/* view product */}

          <div className=" w-full max-w-3xl ">
            {loading
              ? loadingcart.map((el) => {
                  return (
                    <div
                      key={el + "itemsInCart"}
                      className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse"
                    ></div>
                  );
                })
              : data.map((product, index) => {
                  return (
                    <div
                      key={product._Id + "itemsIwenCart" + index}
                      className="w-full bg-white h-32 my-2  grid grid-cols-[128px,1fr] "
                    >
                      <div className="h-32 w-32 bg-slate-200">
                        <img
                          src={product?.productId?.productImage[0]}
                          alt=""
                          className=" h-full w-full object-scale-down mix-blend-multiply"
                        />
                      </div>

                      <div className=" px-4 py-2 relative">
                        <div
                          className=" absolute right-3 text-red-600 rounded-full p-2 text-3xl hover:bg-red-600 hover:text-white cursor-pointer"
                          onClick={() => {
                            deleteCartProduct(product?._id);
                          }}
                        >
                          <MdDelete />
                        </div>
                        <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                          {product?.productId?.productName}
                        </h2>
                        <p className=" capitalize text-slate-500">
                          {product?.productId?.category}
                        </p>
                        <div className="flex justify-between">
                          <p className="text-green-700 font-medium text-lg ">
                            {currency(product?.productId?.sellingprice)}
                          </p>
                          <p className="text-green-700 font-semibold text-lg ">
                            {" "}
                            {currency(
                              product?.productId?.sellingprice *
                                product?.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            onClick={() => {
                              decreseCartProductQuantity(
                                product?._id,
                                product?.quantity
                              );
                            }}
                            className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          >
                            -
                          </button>

                          <span>{product?.quantity}</span>

                          <button
                            onClick={() => {
                              increseCartProductQuantity(
                                product?._id,
                                product?.quantity
                              );
                            }}
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
          {/* total product */}
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-300 border-slate-200 animate-pulse"></div>
            ) : (
              <div className="w-64 relative h-96">
              <div className="h-10 w-10 rounded-full absolute left-5 top-5 bg-purple-600 blur-2xl"></div>
              <div className="h-20 w-20 rounded-full absolute left-5 top-5 bg-purple-600 blur-2xl"></div>
              {/* <div className="h-20 w-20 rounded-full absolute  bg-purple-600 blur-2xl opacity-20"></div> */}
             <div className="bg-gray-200 rounded-lg w-full h-full p-4 ">
               <p>You're paying Before Tax</p>
               <div className="text-3xl text-black font-bold m-2">{currency(priceBeforeTax)}</div>
               <div className="flex flex-col w-full gap-7 mt-12 ">
                 <div className="flex justify-between">
                   <p className=" text-base font-semibold">GST-18%</p>
                   
                   <p className="text-base font-medium">{currency(totalPrice-priceBeforeTax)}</p>
                 </div>
                 <div className="flex justify-between">
                   <p className=" text-base font-semibold">Shipping Charge</p>
                   <p className="text-base font-medium" >{currency(40)}</p>
                 </div>
                 <div className="flex justify-between">
                   <p className=" text-base font-semibold"> Discounts & Offers</p>
                   <p className="text-base font-medium" >{currency(200)}</p>
                 </div>
               </div>
               <div className="h-[1px] w-full bg-gray-500 mt-8"></div>
               <div className="mt-7 flex justify-between ml-2">
                 <p className="text-base font-semibold">Total</p>
                 <p className="text-base font-medium">{currency(total)}</p>
               </div>
             </div>
            
             
           </div>
            )}
            {/* <Link to={'/paymentGetway'}>
            <button className="mt-5 w-48 h-10 bg-purple-500 rounded-md ">Pay Now</button>
          </Link> */}
           <button onClick={()=>{initiatePayment()}} className="mt-5 w-64 h-10 bg-purple-500 rounded-md ">Pay Now</button>
          </div>
         

        </div>
      </div>
      
     
    </Context.Provider>
  );
};

export default Cart;
