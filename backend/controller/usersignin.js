import bcrypt from 'bcryptjs'
import usermodel from '../models/usermodel.js';
import jwt from 'jsonwebtoken'

const  userSignInController = async (req,resp) => {
 try {
  const { email, password } = req.body;

   if(!email){
    throw new Error("Please provide email")
   }
   if(!password){
    throw new Error("Please provide password")
   }

const user = await usermodel.findOne({ email });

if(!user){
   throw new Error("User not found")
}
const checkPassword = bcrypt.compareSync(password, user.password)

console.log('password:'  , checkPassword )


if(checkPassword ){

   const tokendata ={
_id : user._id,
email : user.email,
   }
 const token = await jwt.sign(tokendata,  process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});

 const tokenOption= { 
httpOnly:true,
secure:true
 }
 resp.cookie("token" ,token,  tokenOption).status(200).json({
   message:"login sucessfully",
   data : token,
   success:true,
   error:false
 })
}else{
   resp.json({message:"Invalid password", success:false, error:true})
}
 } catch (err) {
    resp.json({
              message: err.message || err, // Log the error message instead of the whole error object
              error: true,
              success: false,
            });
    
 }
}

export default  userSignInController