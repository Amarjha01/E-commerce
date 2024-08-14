import React, { useState } from "react";
import signin from "../asset/signin.gif";
import { Link, useNavigate } from "react-router-dom";

import "./pages.css";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (data.password === data.confirmpassword) {
      const dataResponse = await fetch("http://localhost:5000/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } else {
      console.log("Password didn't match");
    }
    // console.log("data :", data)
  };

  return (
    <>
      <section id="signup">
        <div className="Customecontainer">
          <div className="lgncontainer">
            <div className="signin-gif">
              <img src={signin} alt="signin" className="img-fluid" />
            </div>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="data">
                <label className='signup-page-label' htmlFor="">Enter your name:</label>
                <div className="passinput">
                  <input
                    className="lgninput"
                    type="text"
                    placeholder="Name"
                    required
                    onChange={handleOnChange}
                    name="name"
                  />
                  {/* /> */}
                </div>
              </div>

              <div className="data">
                <label className='signup-page-label' htmlFor="">Email :</label>
                <div>
                  <input
                    className="lgninput"
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleOnChange}
                    name="email"
                  />
                </div>
              </div>

              <div className="data">
                <label className='signup-page-label' htmlFor="">Password :</label>
                <div className="passinput">
                  <input
                    className="lgninput"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={handleOnChange}
                    name="password"
                  />

                  <div>
                    <span>
                      {showPassword ? (
                        <FaRegEye
                          onClick={() => setShowPassword(!showPassword)}
                          className="eye"
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => setShowPassword(!showPassword)}
                          className="closeeye"
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="data">
                <label className='signup-page-label' htmlFor="">Confirm Password :</label>
                <div className="passinput">
                  <input
                    className="lgninput"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter password again"
                    required
                    onChange={handleOnChange}
                    name="confirmpassword"
                  />

                  {/* /> */}
                  <div>
                    <span>
                      {showConfirmPassword ? (
                        <FaRegEye
                          onClick={() =>
                            setConfirmShowPassword(!showConfirmPassword)
                          }
                          className="eye"
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() =>
                            setConfirmShowPassword(!showConfirmPassword)
                          }
                          className="closeeye"
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lgnbtn">
                <button className="btn" type="submit">
                  Signup
                </button>
              </div>

              <div className="loginlink">
                <p className="loginlnktxt">Already have account?</p>{" "}
                <Link to={"/login"} className="loginlnk">
                  log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
      {data.password !== data.confirmpassword &&
        console.log("Password didn't match")}
    </>
  );
};

export default signup;
