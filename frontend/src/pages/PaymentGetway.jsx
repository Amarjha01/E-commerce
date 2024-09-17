import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Context from "../context/index"
import currency from "../helpers/Currency.jsx";
import blob from "../asset/randum/blob.svg"
import summaryApi from "../common";
import { useSelector } from "react-redux";






const PaymentGetway = () => {
  const [data, setData] = useState([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)



  const fetchdata = async () => {
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
    }
  };
  useEffect(() => {
    fetchdata();
  },[])
  const tptalPrice = data.reduce((prev, current) => prev + current.productId.sellingprice * current.quantity,0);

const total = tptalPrice + (18/100)*tptalPrice + 40 - 200;

const user = useSelector((state) => state?.user?.user);
console.log('user_id-payment', user)
  return (
   user && (
    <div className="container mx-auto mt-4 flex justify-center items-center g-green-400 overflow-hidden ">
    <div className="-inset-2/4 p-12 bg-white lg:flex lg:flex-row flex flex-col gap-5">
      <div className="flex flex-col w-96">
        <h1 className="text-xl font-bold">Let's make Payment</h1>
        <p className="w-96  text-xs mt-5">Input your card details to make payment. You will be redirected to your banks authorization page. </p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-10 gap-4 w-72">
        <div className="flex flex-col">
        <label className="text-sm text-gray-700 ">Cardholder's Name</label>
        <input {...register("cardholdersName", { required: true })} className="bg-slate-200 border-b border-purple-500 outline-none p-2 text-purple-600 rounded-md h-8 w-72" />
        {errors.cardholdersName && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
        </div>
       <div className=" flex flex-col">
       <label className="text-sm text-gray-700" >Card number</label>
       <input type="text"  {...register("cardNumber", { required: true ,  pattern: /^\d{13,19}$/ })} className="bg-slate-200 border-b border-purple-500 outline-none p-2 text-purple-600 rounded-md h-8 w-72" />
       {errors.cardNumber && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
       </div>
       <div className="flex justify-between  w-full">
       <div className="flex flex-col">
       <label className="text-sm text-gray-700">Expiry</label>
       <input type="text" {...register("expiry", { required: true,  })} className="bg-slate-200 border-b border-purple-500 outline-none p-2 text-purple-600 rounded-md h-8 w-28" />
       {errors.expiry && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
       </div>
       <div className="flex flex-col">
       <label className="text-sm text-gray-700">CVV</label>
       <input type="text" {...register("cvv", { required: true, })} className="bg-slate-200 border-b border-purple-500 outline-none p-2 text-purple-600 rounded-md h-8 w-28" />
       {errors.cvv && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
       </div>
       </div>
      <div className=" flex flex-col">
      <label className="text-sm text-gray-700">Discount Code</label>
      <input defaultValue={"INDIA-200-OFF"} {...register("discountCode", { })} className="bg-slate-200 border-b border-purple-500 outline-none p-2 text-purple-600 rounded-md h-8 w-72" />
      </div>
        <button type="submit" className=" bg-purple-500 text-white w-32 h-10 rounded-md">Pay</button>
        </div>
        </form>
      </div>
      <div className="w-64 relative h-96">
         <div className="h-10 w-10 rounded-full absolute left-5 top-5 bg-purple-600 blur-2xl"></div>
         <div className="h-20 w-20 rounded-full absolute left-5 top-5 bg-purple-600 blur-2xl"></div>
         {/* <div className="h-20 w-20 rounded-full absolute  bg-purple-600 blur-2xl opacity-20"></div> */}
        <div className="bg-gray-200 rounded-lg w-full h-full p-4 ">
          <p>You're paying</p>
          <div className="text-3xl text-black font-bold m-2">{currency(tptalPrice)}</div>
          <div className="flex flex-col w-full gap-7 mt-12 ">
            <div className="flex justify-between">
              <p className=" text-base font-semibold">GST-18%</p>
              
              <p className="text-base font-medium">{currency((18/100)*tptalPrice)}</p>
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
    </div>
  </div>
   )
  )
}

export default PaymentGetway