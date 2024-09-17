import userAddressModel from '../../models/userAddressModel.js';

const userAddress = async (req, res) => {

    try {
        const userShippingAddress = req.body;

        const userId = req.userID;
console.log('userId: ',userId)
        const payload = {
            ...userShippingAddress,
            userId: userId,
            
        };
        const userAddress = new userAddressModel(payload);
        const savedUserAddress = await userAddress.save();
        res.status(200).json({
            message: "User Address Saved Successfully",
             data: savedUserAddress,
             error: false,
             success: true
            });

        console.log('userShippingAddress: ',userShippingAddress)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
        
    }
}

export default userAddress;