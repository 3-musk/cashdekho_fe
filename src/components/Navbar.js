import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";
import { successAlert } from "../utils/alerts";
import "../styles/Navbar.css";

const NavBar = () => {
  const { isLoggedin, userRole } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hamclick, setHamclick] = useState(false);

  const menuclick = () => setHamclick((prev) => !prev);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(login(user));
  }, [dispatch]);

  const signOut = () => {
    localStorage.removeItem("user");
    successAlert("Signed out successfully");
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link className="navbar-logo" to="/" onClick={() => setHamclick(false)}>
          CashDekho
        </Link>

        {/* Center links (desktop) */}
        <div className="navbar-links">
          <a href="#terms" onClick={() => setHamclick(false)}>Terms</a>
          <a href="#refund" onClick={() => setHamclick(false)}>Refund</a>
          <a href="#privacy" onClick={() => setHamclick(false)}>Privacy</a>
        </div>

        {/* Hamburger menu icon (mobile) */}
        <div className="hamburger-wrapper" onClick={menuclick}>
          <div className={hamclick ? "hamburger hamactive" : "hamburger"}>
            <hr className="hline-1" />
            <hr className="hline-2" />
            <hr className="hline-3" />
          </div>
        </div>

        {/* Desktop right-side auth menu */}
        <div className="auth-links">
          {isLoggedin ? (
            <>
              <Link to="/applications">Applications</Link>
              <Link to="/my-profile">My Profile</Link>
              <button onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={hamclick ? "mobile-menu active" : "mobile-menu"}>
        <a href="#terms" onClick={() => setHamclick(false)}>Terms</a>
        <a href="#refund" onClick={() => setHamclick(false)}>Refund</a>
        <a href="#privacy" onClick={() => setHamclick(false)}>Privacy</a>

        {isLoggedin ? (
          <>
            <Link to="/applications" onClick={() => setHamclick(false)}>Applications</Link>
            <Link to="/my-profile" onClick={() => setHamclick(false)}>My Profile</Link>
            <Link to="/" onClick={() => { setHamclick(false); signOut(); }}>Sign Out</Link>
          </>
        ) : (
          <>
            <Link to="/signup" onClick={() => setHamclick(false)}>Sign Up</Link>
            <Link to="/login" onClick={() => setHamclick(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;