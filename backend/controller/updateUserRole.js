import userModel from '../models/usermodel.js';


async function updateUserRole(req, res) {
try {

    const usersession = req.userID;
    const { userId, name ,email, role } = req.body;
    console.log('userId:', userId, 'name:', name, 'email:', email, 'role:', role);
    const payload = {
       ...(email && { email : email }),
       ...(name && { name : name }),
       ...(role && { role : role }),
       ...(userId && { userId : userId }),
    }

    const user = await userModel.findById(usersession);
    console.log('user-role :', user.role);
    // if(user.role !== 'ADMIN') {
    //     return res.status(401).json({
    //         message: 'You are not authorized to update user role',
    //         success: false,
    //         error: true
    //     });
    // }
const userUpdate = await userModel.findByIdAndUpdate(userId, payload);

// console.log('userUpdate:', userUpdate, 'payload:', payload, 'userId:', userId);

res.json({
    message: 'User role updated successfully',
    success: true,
    error: false,
    data: userUpdate
});

} catch (error) {
    res.status(500).json({ 
        message: error.message,
        success: false,
        error: true
     });
    
}
}

export default updateUserRole;