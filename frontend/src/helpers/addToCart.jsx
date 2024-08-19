import summaryApi from '../common/index.jsx';
import {toast} from 'react-toastify';
// import {useContext} from 'react';
// import Context from '../context/index.js';
const addToCart = async (e,id) => {
  e.stopPropagation();
 e?.preventDefault();
 const fetchCart = await fetch(summaryApi.addToCart.url,{
   method:summaryApi.addToCart.method,
   credentials:'include',
   headers:{
     'Content-Type':'application/json',
   },
   body:JSON.stringify({
    productId:id

  })
})
const responseData = await fetchCart.json();

if(responseData.success){
  toast.success(responseData.message);
  // fetchUserAddToCart();
}else if(responseData.warning){
  toast.warning(responseData.message);
} else{
  toast.error(responseData.message);
}


}
export default addToCart;