const backendDomain = 'http://my-backend-app-env.eba-qrjj9aqa.ap-south-1.elasticbeanstalk.com';
// const backendDomain = 'http://192.168.45.146:5000';

const summaryApi = {
    signUp: { 
        url: `${backendDomain}/api/signup`,
        method: 'POST'
    },
    signIn: { 
        url: `${backendDomain}/api/signin`,
        method: 'POST'
    },
    currentUser: { 
        url: `${backendDomain}/api/user-detail`,
        method: 'GET'
    },
    userlogout: { 
        url: `${backendDomain}/api/logout`,
        method: 'GET'
    },
    allUsers: { 
        url: `${backendDomain}/api/all-Users`,
        method: 'GET'
    },
    updateUserRole: { 
        url: `${backendDomain}/api/update-UserRole`,
        method: 'POST'
    },
    uploadProduct: { 
        url: `${backendDomain}/api/upload-product`,
        method: 'POST'
    },
    AllProduct: { 
        url: `${backendDomain}/api/get-product`,
        method: 'get'
    },
    UpdateProduct: { 
        url: `${backendDomain}/api/update-product-details`,
        method: 'POST'
    },
    productCategory: { 
        url: `${backendDomain}/api/get-category-product`,
        method: 'GET'
    },
    CategoryWiseProduct: { 
        url: `${backendDomain}/api/category-wise-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post'
    },
    addToCart: {
        url: `${backendDomain}/api/addtocart`,
        method: 'post'
    },
    countaddtocartproduct: {
        url: `${backendDomain}/api/countaddtocartproduct`,
        method: 'get'
    },
    viewAddToCart: {
        url: `${backendDomain}/api/cartDetail`,
        method: 'get'
    },
    updateCartProductQuantity: {
        url: `${backendDomain}/api/updateCartProductQuantity`,
        method: 'post'
    },
}

export default summaryApi;
