import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">S</span>
          SPRINTIX <small>SPORTS DEPT.</small>
        </NavLink>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
            Bag
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>

          {user ? (
            <div className="user-block">
              <span className="user-greeting">Hi, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
