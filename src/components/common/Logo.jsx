import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Newcomer Jobline Logo" className="h-12 w-auto" />
    </Link>
  );
};

export default Logo;
