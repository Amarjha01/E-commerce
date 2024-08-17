const backendDomain = 'http://localhost:5000';
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
}

export default summaryApi;
