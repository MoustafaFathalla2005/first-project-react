import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import "./MainCom.css";

function MainCom() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <div className="app-content">
        <div id="main-content" tabIndex="-1">
          <Outlet />
        </div>
      </div>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Sprintix Sports Store — Train hard. Shop smart.</p>
      </footer>
    </div>
  );
}

export default MainCom;
