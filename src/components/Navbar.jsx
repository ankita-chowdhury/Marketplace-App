import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../assets/images/Search.svg";
import ProfileIcon from "../assets/images/User-icon.png";
import LogoutIcon from "../assets/images/Logout-icon.png";

const Navbar = ({ setSearchResult }) => {
  const navigate = useNavigate();
  const [logoutPopup, setLogoutPopup] = useState(false);

  const handleShow = () => {
    if (logoutPopup === true) {
      setLogoutPopup(false);
    } else {
      setLogoutPopup(true);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("loginKey");
    navigate("/login");
  };
  const handleSearch = (inputVal) => {
    setSearchResult(inputVal);
  };
  return (
    <nav className="nav-component">
      <div className="logo-container">
        <p>
          <span className="logo-icon">go</span>
          Mart
        </p>
      </div>
      <div className="nav-link">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/transaction">Transaction</Link>
      </div>
      <div className="search-container">
        <img src={Search} alt="" />
        <input type="text" onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <div className="profile-icon" onClick={() => handleShow()}>
        <img src={ProfileIcon} alt="" />
        {logoutPopup && (
          <div className="logout-div">
            <Link className="edit-user-profile" to={"/profile"}>
              Edit Profile
            </Link>
            <p onClick={() => handleLogout()} className="logout-icon-style">
              Logout <img src={LogoutIcon} alt="" />
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
