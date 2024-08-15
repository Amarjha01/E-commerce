import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import { MdShoppingCart } from "react-icons/md";
import "./components.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import role from "../common/Rolee";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const handleLogout = async () => {
    const fetchData = await fetch("http://localhost:5000/api/logout", {
    // const fetchData = await fetch("http://192.168.45.146:5000/api/logout", {
      message: "Logout Successfully",
      method: "GET",
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    } else if (data.err) {
      toast.error(data.err);
    }
  };
  const [menueDisplay, setMenueDisplay] = React.useState(false);

  return (
    <>
      <header className="fixed z-40">
        <div className="header">
          <div className="logosvg">
            <Link to={"/"}>
              <Logo className="logoo" w={120} h={50} />
            </Link>
          </div>

          <div className="search">
            <input
              className="headerinput"
              type="text"
              placeholder="Search..."
            />
            <button className="button">
              <IoSearch className="searchicon" />
            </button>
          </div>

          <div className="user-cart-login">
            <div
              className="relative group flex justify-center"
              onClick={() => setMenueDisplay((preve) => !preve)}
            >
             {
              user?._id && (
                <div className="relative left-10  ">
                <LuUserCircle2 className="usericon " />
              </div>
              )
             }
              {menueDisplay && (
                <div className="absolute top-11 bottom-0 h-fit p-2 shadow-lg rounded-sm ">
                  <nav>
                    {
                      user?.role === role.ADMIN &&(
                        <Link
                      to={"Admin-Panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-1 bg-white "
                     
                    >
                      Admin panel
                    </Link>
                      )
                    }
                  </nav>
                  
                </div>
              )}
            </div>
            <div className="cart relative left-8 h-14 w-8 flex">
                <MdShoppingCart className="carticon cursor-pointer h-14 w-14" />
            </div>
            <span className="flex relative bottom-4 left-1 h-6 w-6 rounded-full bg-red-600 justify-center ">
              <p className="cursor-pointer font-bold text-white">0</p>
            
              </span>
            <div>
              {user ? (
                 <Link to={"/login"}>
                <button className="loginbtn" onClick={handleLogout}>
                  Logout
                </button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button className="loginbtn">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
