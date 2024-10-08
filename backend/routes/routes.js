
import express from 'express';
import usersignupcontroller from '../controller/usersignup.js';
import userSignInController from '../controller/usersignin.js';
import userdetailcontroller from '../controller/userdetails.js';
import authtoken from '../middleware/authtoken.js';
import userlogoutcontroller from '../controller/userlogout.js';
import allUsers from '../controller/allUsers.js';
const router = express.Router(); // ES Module
import updateUserRole from '../controller/updateUserRole.js';
import uploadProductController from '../controller/uploadProduct.js';
import getProductController from '../controller/getProduct.js';
import updatedProductDetailController from '../controller/updateProductDetail.js';
import getCategoryProduct from '../controller/product/getcategoryProduct.js';
import CategoryWiseProduct from '../controller/product/CategoryWiseProduct.js'
import productDetails from '../controller/product/getProductDetails.js';
import addToCartController from '../controller/user/addToCart.js';
import countAddToCartProduct from '../controller/user/countAddToCartProduct.js';
import viewAddToCart from '../controller/user/viewAddToCart.js'
import updateAddToCartProduct from '../controller/user/updateAddToCartProduct.js'
import deleteAddToCartProduct from '../controller/user/deleteAddToCartProduct.js';
import searchProduct from '../controller/product/searchProduct.js'
import userAddress from '../controller/user/userAddress.js';
import displayUserAddress from '../controller/user/displayUserAddress.js';
import paymentGetway from '../controller/paymentGetway.js';
import onSuccessfullPayment from '../controller/user/onSuccessfullPayment.js';
// Set up routes
router.post('/signup', usersignupcontroller);
router.post('/signin', userSignInController);
router.get('/user-detail', authtoken, userdetailcontroller);
router.get('/logout', userlogoutcontroller);
router.get('/all-Users', authtoken, allUsers);
router.post('/update-UserRole', authtoken, updateUserRole);
router.post('/upload-product', authtoken, uploadProductController);
router.get('/get-product', getProductController);
router.post('/update-product-details', updatedProductDetailController);
router.get('/get-category-product', getCategoryProduct);
router.post('/category-wise-product', CategoryWiseProduct);
router.post('/product-details', productDetails);
router.post('/addtocart',authtoken, addToCartController);
router.get('/countaddtocartproduct',authtoken, countAddToCartProduct);
router.get('/cartDetail',authtoken, viewAddToCart);
router.post('/updateCartProductQuantity',authtoken, updateAddToCartProduct);
router.delete('/deleteCartProduct',authtoken, deleteAddToCartProduct);
router.get('/search', searchProduct)
router.post('/shippingAddress',authtoken, userAddress);
router.get('/displayuseraddress',authtoken, displayUserAddress);
router.post('/pay' , paymentGetway);
router.delete('/onsuccessfullpayment' ,authtoken, onSuccessfullPayment);

export default router;
