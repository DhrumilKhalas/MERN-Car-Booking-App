import React, { useState, useEffect } from "react";
import "./login.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (localStorage.getItem("carUser")) {
      localStorage.getItem("carUser");
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", {
        username: username,
        password: password,
      });
      // console.log(res.data);
      if (res.data === "Invalid Credentials!") {
        toast.error("Invalid Credentials!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else {
        alert("User Login Successful!");
        navigate("/");
        localStorage.setItem("carUser", JSON.stringify(res.data));
        // console.log(res)
      }
    } catch (err) {
      // console.log(err);
      toast.error("Error occured. Please try again later!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className="logincontainer">
        <div className="loginheader">
          {" "}
          <Navbar />
        </div>

        <div className="loginbody">
          <div className="login">
            <h1 className="loginheading">LOGIN</h1>

            <form className="loginform" onSubmit={handleSubmit}>
              <div className="loginusername">
                <label htmlFor="loginusername" className="loginusernamelabel">
                  Username:
                </label>
                <input
                  type="text"
                  id="loginusername"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="loginusernameinput"
                />
              </div>

              <div className="loginpassword">
                <label htmlFor="loginpassword" className="loginpasswordlabel">
                  Password:
                </label>
                <input
                  type="password"
                  id="loginpassword"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="loginpasswordinput"
                />
              </div>

              <div className="loginbutton">
                <button className="loginbuttoninner">LOGIN</button>
              </div>

              <div className="logintext">
                Don't have an account? Click <Link to="/register">here</Link> to
                register.
              </div>
            </form>
          </div>
        </div> 

        <div className="loginfooter">
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
