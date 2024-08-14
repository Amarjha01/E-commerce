import userModel from '../models/usermodel.js';

const uploadProductPermission = async (userID) => {
    // console.log(userID);
   
        const user = await userModel.findById(userID);
        if (user.role !== 'ADMIN') {
            return false;
        }
            return true ;
        
  
}

export default uploadProductPermission;