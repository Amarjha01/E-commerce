import usermodel from '../models/usermodel.js';

async function  userdetailcontroller(req, resp, next){
try {
    const token = req.cookies?.token || req.headers; //?.authorization?.split(' ')[1]

    console.log('token-from-userdetail:', token)
    // console.log('userID-from-userdetail:', req.userID)
    const user = await usermodel.findById(req.userID);
    console.log('user:', user)
    resp.status(200).json({
        message: "user details",
        data : user,
        error: false,
        success: true,
    })
} catch (err) {
    resp.status(400).json({
        message: err.message || err, // Log the error message instead of the whole error object
        data : null,
        error: true,
        success: false,
      });
    
}
}

export default userdetailcontroller;