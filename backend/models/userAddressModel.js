import mongoose from "mongoose";

const userAddressSchema = mongoose.Schema({
    userId: String,
    fullName: String,
    landMark: String,
    address: String,
    state: String,
    postalCode: String,
    contactNumber: String,
} ,{
    timestamps: true
});

const userAddress = mongoose.model('UserAddress', userAddressSchema);
export default userAddress;