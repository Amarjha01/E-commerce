import summaryApi from '../common/index.jsx';
import {toast} from 'react-toastify';
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
}else if(responseData.warning){
  toast.warning(responseData.message);
} else{
  toast.error(responseData.message);
}


}
export default addToCart;