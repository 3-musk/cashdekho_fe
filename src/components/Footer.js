import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="footer">
      <span>© {date.getFullYear()} | All rights reserved.</span>
    </footer>
  );
};

export default Footer;