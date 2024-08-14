import User from "../models/usermodel.js";

async function allUsers(req, res) {
    try {
        console.log(" userId All Users :" , req.userId );
        
        const allUsers = await User.find();


        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: allUsers,
        });
    } catch (error) {
        res.status(400).json({
             error: error.message,
            sucess : false,
            error:true
            });
    }
}

export default allUsers;