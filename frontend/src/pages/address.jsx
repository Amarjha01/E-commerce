import { useForm} from "react-hook-form"
import { FaRegCircleDot } from "react-icons/fa6";
import { Await, Link, useNavigate } from "react-router-dom"
import summaryApi from "../common";
import { useEffect,useState } from "react";
const address = () => {
    const [userAddress, setuserAddress] = useState([''])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate()
      const onSubmit = async (data) => {
       try {
        const fetchData = await fetch(summaryApi.userShippingAddress.url, {
            method: summaryApi.userShippingAddress.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
    })
    const response = await fetchData.json();
    console.log(response)
    if(response.success){
        navigate('/cart')
    }
       } catch (error) {
        console.log(error)
       }
}

const fetchUserAddress = async () => {
    try {
        const responseAddress = await fetch(summaryApi.displayUserAddress.url, {
            method: summaryApi.displayUserAddress.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        const responseData = await responseAddress.json();
        setuserAddress(responseData.data)
        console.log('responseData: ',responseData.data); // Check the response data
         
    } catch (error) {
        
    }
}

useEffect(() => {
    fetchUserAddress();
    
},[]);


  return (
    <>
    <div className="text-purple-500 flex mt-6 justify-center items-center gap-1">
        <span className=""><FaRegCircleDot /></span>
    <a href="#addNewAddress">Add New Address</a>
    </div>
   <div className="container w-full flex lg:flex-row  justify-center flex-col">
   {userAddress.map((userAddress,index)=>{
       return(
        <div className="m-2 w-1/3">
            <div className="h-full w-full border border-purple-500 rounded-md">
            <div className="m-4 cursor-pointer">
                <p><span className="text-base font-semibold text-gray-700">Full Name : </span>{userAddress.fullName}</p>
                <p><span className="text-base font-semibold text-gray-700">Address : </span>{userAddress.address}</p>
                <p><span className="text-base font-semibold text-gray-700">Land Mark : </span>{userAddress.landMark}</p>
                <p><span className="text-base font-semibold text-gray-700">State : </span>{userAddress.state}</p>
                <p><span className="text-base font-semibold text-gray-700">Postal Code : </span>{userAddress.postalCode}</p>
                <p><span className="text-base font-semibold text-gray-700">Contact Number : </span>{userAddress.contactNumber}</p>

            </div>
            </div>
        </div>
       )
    })}
   </div>
    <div className="container mx-auto" id="addNewAddress" >
        <p className="m-4 text-base font-semibold text-gray-700 ">Shiping address</p>
       <div className="flex justify-center items-center">
       <div className="  border-2 rounded-lg border-blue-700 w-1/2 my-4">
       <div className="flex  items-center mt-4">
            <span className="text-purple-500 mx-2 "><FaRegCircleDot /></span>
            <p>Add New Address</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-10 my-5 ">
        <div className="flex justify-between w-full  ">
       <div className="flex flex-col">
       <label>Full Name</label>
       <input  {...register("fullName", {required:true})} className="py-3 lg:w-64 px-1 border border-slate-500 rounded-md outline-none" />
         {errors.fullName && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
       </div>
       <div className="flex flex-col">
       <label>Land Mark</label>
       <input  {...register("landMark",{required:true})} className="py-3 lg:w-64 px-1 border border-slate-500 rounded-md outline-none" />
       {errors.landMark && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
       </div>
        </div>
        <div className=" flex flex-col">
        <label>Address</label>
        <input  {...register("address",{required:true})} className="py-3 px-1 border border-slate-500 rounded-md outline-none" />
        {errors.address && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
        </div>

        <div className=" flex justify-between">
            <div className="flex flex-col">
                <label htmlFor="">Contact Number</label>
                <input type="text" {...register("contactNumber",{required:true})} className="py-3 px-1 w-44  border border-slate-500 rounded-md outline-none" />
                {errors.contactNumber && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
            </div>
            
            <div className="flex flex-col justify-between">
                <label htmlFor="">State</label>
                <input type="text" {...register("state",{required:true})} className="py-3 px-1 w-44 border border-slate-500 rounded-md outline-none" />
                {errors.state && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="">Postal Code</label>
                <input type="text"  {...register("postalCode",{required: true})} className=" py-3 px-1 w-44 border border-slate-500 rounded-md outline-none" />
                {errors.postalCode && <span className=" text-red-600 mb-2 text-xs">This field is required</span>}
            </div>  
        </div>

        
        <div className="flex justify-between my-5">
        <Link to={'/cart'} >
               <button className="border border-slate-600 rounded-md px-12 py-4">Cancel</button>
               </Link>
               <button type="submit" className="bg-blue-600 py-4 w-96 rounded-md text-white">Save this address</button>
            </div>
            
       
       </form>
       </div>
       </div>
    </div>
    </>
  )
}

export default address