import React, { useContext, useState } from 'react'
import signin from '../asset/signin.gif'
import { Link ,  useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import context from '../context/index.js';
import summaryApi from '../common/index.jsx';
import './pages.css'


import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const[data,setdata] = useState({
        email:'',
        password:''
    })
    const {fetchUserDetails,fetchUserAddToCart} = useContext(context);
    // console.log('generalContext:', fetchUserDetails());
const handleOnChange =(e) =>{
    const{name,value} = e.target;
    setdata((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
}

const handleSubmit = async (e) =>{
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.signIn.url,{
        method:summaryApi.signIn.method,
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
const dataApi = await dataResponse.json();

if(dataApi.success){
    toast.success(dataApi.message);
    navigate('/');
    fetchUserDetails();
    fetchUserAddToCart()
}else{
    toast.error(dataApi.message);
}
}


console.log("data :", data )
 
  return (
    <>
    <section id='login'>
        <div className="Customecontainer">
           <div className='lgncontainer'>
           <div className='signin-gif'>
                <img src={signin} alt="signin" className="img-fluid" />
            </div>
           </div>

            <form action=""  onSubmit={handleSubmit}>
                <div className="form-group">
                <div className="data">
                    <label className='login-page-label' htmlFor="">Email :</label>
                    <div> 
                    <input className='lgninput' 
                    type="email" 
                    placeholder="Enter your email"
                    required
                    onChange={handleOnChange}
                    name='email'/>
                    </div>
                </div>

                <div className="data">
                    <label className='login-page-label' htmlFor="">Password :</label>
                    <div className='passinput'>
                    <input className='lgninput' 
                    type={showPassword? "text" : "password"} 
                    placeholder="Enter your password" 
                    required 
                    onChange={handleOnChange}
                    name='password'/>


                    <div>
                        <span>

                        {showPassword ? (
                               <FaRegEye onClick={() => setShowPassword(!showPassword)} className='eye' />
                                ) : (
                               <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className='closeeye' />
                               )}   
                        </span>
                    </div>
                    </div>
                    
                    <Link to = {'/ForgotPassword'} className='forgot-pass'>
                        Forgot Password?
                    </Link>
                </div>

                <div className="lgnbtn">
                    <button className='btn' type="submit">Login</button>
                </div>

                <div className="signuplink">
                <p className='signuplnktxt'>Don't have account?</p> <Link to = {"/signup"} className='signuplnk'>Sign Up</Link>

                </div>

                </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default Login;