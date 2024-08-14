const backendDomain = 'http://localhost:5000';

const summaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "POST"
    },
    signIn : { 
        url :`${backendDomain}/api/signin`,
        method : 'POST'
    }
}

export default summaryApi;