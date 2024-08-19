import jwt from "jsonwebtoken";

async function authtoken(req, resp , next) {
  try {
    const token =
      req.cookies?.token ;
     
    if (!token) {
      return resp.status(200).json({
        message: "please login",
        error: true,
        success: false,
      });
    }
  // console.log("token-from-auth:" , token)
    
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
      console.log(err);
      console.log("decoded",decoded);

      if (err) {
       console.log("error auth", err);
      }
    req.userID = decoded?._id;
    next()
    });
  } catch (error) {
    resp.status(400).json({
      message: error.message || error, // Log the error message instead of the whole error object
      data : [],
      error: true,
      success: false,
    });
  }
}

export default authtoken;
