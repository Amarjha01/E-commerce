import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import Role from '../common/Rolee'
import summaryApi from '../common/index';
import { toast } from 'react-toastify';

const Change_user_role = ({
    name,
    email,
    role,
    userId,
    callfunction,
    onCloseRoleForm
}) => {
    const [userRole, setUserRole] = useState(role);
const handleChange = (e) =>{
    setUserRole(e.target.value);
   console.log(e.target.value);
}

const updateUserRole = async () =>{
   
    const response = await fetch(summaryApi.updateUserRole.url, {
        method: summaryApi.updateUserRole.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId : userId,
            role: userRole
        })
    })
    const responsedata = await response.json();
    console.log("update-user",  responsedata);
    if(responsedata.success){
        toast.success(responsedata.message);
        onCloseRoleForm();
        callfunction();
    }
}


const ChangeChangeUserRoleForm = () => {

}
  return (
    <>
     <div className='absolute top-0 left-0 flex-col flex justify-center   items-center z-10 w-full h-full bg-slate-200 bg-opacity-50  '>

     <div className='mx-auto rounded-md bg-slate-400 shadow-md p-4 w-full max-w-md text-center'>
     <button className="block ml-auto" onClick={onCloseRoleForm}>
        <IoClose className="h-6 w-6"/>
    </button>
    <h1 className='pb-4 text-white text-2xl font-bold'>Change User Role</h1>
    
    <div className='flex flex-col w-full items-start '>
     <p>Name: {name} </p>
     <p>Email: {email} </p>
     <div className='flex items-center justify-between w-full mt-4'>
        <p>Role:</p>
        <select className='border outline-none cursor-pointer rounded-md py-1 px-4 ' value={userRole} onChange={handleChange} >
            {
                Object.values(Role).map((role, index) =>{
                    return <option className='bg-slate-200' value={role} key={role}>{role}</option>
                })
            }
        </select>
     </div>
     </div>
     <button className=' mt-2 py-1 px-3 rounded-full font-bold text-white bg-red-600 hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
     </div>
    
    </div>
    </>
  )
}

export default Change_user_role