import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
 
  const userinLocalStorage = localStorage.getItem("carUser")
    ? JSON.parse(localStorage.getItem("carUser"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("carUser");
    alert("You have logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">

        <div className="navright">
          <Link to="/" className="logo">
            CAR BOOKING
          </Link>
        </div>

        <div className="navright">
          {userinLocalStorage ? (
            <>
              <div
                style={{
                  color: "antiquewhite",
                  marginRight: "5px",
                  textTransform: "uppercase",
                }}
                className="usernameinnavbar"
              >
                {userinLocalStorage?.username}
              </div>
              <div
                style={{ color: "antiquewhite", cursor: "pointer" }}
                onClick={handleLogout}
              >
                LOGOUT
              </div>
            </>
          ) : (
            <>
              <Link to="/register" className="navricpe">
                REGISTER
              </Link>
              <Link to="/login" className="navlogin">
                LOGIN
              </Link>
            </>
          )} 
        </div>
      </div>
    </>
  );
};

export default Navbar;
 