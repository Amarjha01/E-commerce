import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common/index";
import { useEffect } from "react";
import context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
const dispatch = useDispatch();

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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <context.Provider value={{fetchUserDetails}}>
        <ToastContainer />
       
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
