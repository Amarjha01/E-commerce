import React, { useEffect,  useState} from 'react'
import { toast } from 'react-toastify';
import moment from 'moment';
import ChangeUserRole from '../components/Change_user_role'
import { CiEdit } from "react-icons/ci";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [UpdateUserData, setUpdateUserData] = useState({
    name: '',
    email: '',
    role: '',
    _id: ''
  });


  const fetchAllUsers = async () => {
const fetchData = await fetch('http://localhost:5000/api/all-Users',{
  'method': 'GET',
  credentials: 'include',
})
const dataResponse = await fetchData.json();

if (dataResponse.success ){
  setAllUser(dataResponse.data);
}
if(dataResponse.error){
  toast.error(dataResponse.message);
}
  };

useEffect(() => {
    fetchAllUsers();
}, []);
const changeRole = () => {
  setShowChangeRole(true);
}


  return (
    <div className='min-h-full w-full'>
     <table className='w-full usertable '>
      <thead className='bg-black  text-white'>
        <tr>
        <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created Date</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          allUser.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format('ll')}</td>
              <td>
                <button className=' p-1 rounded-full hover:bg-green-500 hover:text-white ' 
                onClick={()=>{
                  setUpdateUserData(user)
                  setShowChangeRole(true)
                  }}>
                  <CiEdit  className='h-7 w-7 '/></button>
              </td>
            </tr>
          ))
        }
      </tbody>
     </table>

{
  showChangeRole && <ChangeUserRole  
  onCloseRoleForm={()=>setShowChangeRole(false)}
  name={UpdateUserData.name}
  email={UpdateUserData.email}
  role={UpdateUserData.role}
  userId={UpdateUserData._id}
  callfunction={fetchAllUsers}
  />
}
  
      
    </div>
  )
}

export default AllUsers