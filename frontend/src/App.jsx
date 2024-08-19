import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common/index";
import { useEffect,useState } from "react";
import context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
const dispatch = useDispatch();
const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();
if(dataApi.success){
  dispatch(setUserDetails(dataApi.data));
}

      // console.log("dataApi", dataResponse);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

const fetchUserAddToCart = async () => {
  const response = await fetch(summaryApi.countaddtocartproduct.url,{
  credentials: "include"
  })
  const dataApi = await response.json();
  console.log("dataApi",dataApi.data.count);
  setCartProductCount(dataApi?.data?.count);
}
// console.log('userID-from-app.jsx:', req.userID)
  useEffect(() => {
    fetchUserDetails();
    // user cart count
    fetchUserAddToCart()
  }, []);



  return (
    <>
      <context.Provider value={{fetchUserDetails,cartProductCount,fetchUserAddToCart}}>
        <ToastContainer position= 'top-center' />
       
          <Header />
         <main className="min-h-[calc(100vh-118px)] pt-14">
         <Outlet />
         </main>
          <Footer />
        
      </context.Provider>
    </>
  );
}

export default App;
