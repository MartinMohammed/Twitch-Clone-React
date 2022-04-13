import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

// semantic ui - menu
const Header = () => {
  return (
    <div className="ui menu">
      {/* Company Name  */}
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
