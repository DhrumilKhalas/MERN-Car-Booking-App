import React from "react";
import "./footer.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer">Copyright &copy; {year}. All Rights Reserved.</div>
  );
}; 

export default Footer;
