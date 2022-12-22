import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  // console.log(username, password, cpassword)
  useEffect(() => {
    if (localStorage.getItem("carUser")) {
      localStorage.getItem("carUser");
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      //  document.getElementById("registererrorid").innerHTML = "Password and Confirm Password doesn't match!"
      //  setTimeout(()=>{
      //   document.getElementById("registererrorid").innerHTML = ""
      //  }, 10000)
      toast.error("Password and Confirm Password must be same!", {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    } else {
      try {
        const res = await axios.post("/api/users/register", {
          username: username,
          password: password,
        });

        if (res.data === "User already exists!") {
          //   document.getElementById("registererrorid").innerHTML = "User already exists! Try to Login or use different Username."
          // setTimeout(()=>{
          // document.getElementById("registererrorid").innerHTML = ""
          // }, 10000)
          toast.error("User already exists!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          alert("User Registration Successful! Please Login to Continue.");
          // toast.success("User Registration Successful! Please Login to Continue.", {position: toast.POSITION.TOP_CENTER})
          navigate("/login");
          // console.log(res);
        }
      } catch (err) {
        // console.log(err);
        // document.getElementById("registererrorid").innerHTML = "Error occured while registering. Please try again later!"
        // setTimeout(()=>{
        // document.getElementById("registererrorid").innerHTML = ""
        // }, 10000)
        toast.error(
          "Error occured while registering. Please try again later!",
          { position: toast.POSITION.TOP_CENTER }
        );
        return;
      }
    }
  };

  return (
    <>
      <div className="registercontainer">
        <div className="registerheader">
          {" "}
          <Navbar />
        </div>

        <div className="registerbody">
          <div className="login">
            <h1 className="rhraderinform">REGISTER</h1>

            <form className="registerform" onSubmit={handleSubmit}>
              <div className="registerusername">
                <label
                  htmlFor="registerusername"
                  className="registerusernamelabel"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="registerusername"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="registerusernameinput"
                />
              </div>

              <div className="registerpassword">
                <label
                  htmlFor="registerpassword"
                  className="registerpasswordlabel"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="registerpassword"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="registerpasswordinput"
                />
              </div>

              <div className="registercpassword">
                <label
                  htmlFor="registercpassword"
                  className="registercpasswordlabel"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="registercpassword"
                  required
                  autoComplete="off"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  className="registercpasswordinput"
                />
              </div>

              <div className="registerbutton">
                <button className="registerbuttoninner" type="submit">
                  REGISTER
                </button> 
              </div>

              <div className="registertext">
                Already have an account? Click <Link to="/login">here</Link> to
                log in.
              </div>
            </form>
          </div>
        </div>

        {/* <div className="registererror" id="registererrorid"></div> */}

        <div className="registerfooter">
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
