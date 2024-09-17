import userAddressModel from "../../models/userAddressModel.js";


const displayUserAddress = async (req, res) => {
    try {
        const currentUserId = req.userID;


        const userAddress = await userAddressModel.find({userId: currentUserId});

        res.status(200).json({
            message: "User Address fetched successfully",
            success: true,
            error: false,
            data: userAddress
               
        });
        console.log('userAddress: ',userAddress) 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
            error: true,
            success: false

        });
        
    }
}

export default displayUserAddress;