import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import "./MainCom.css";

function MainCom() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <Outlet />
      </div>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Sprintix Sports Store — Train hard. Shop smart.</p>
      </footer>
    </div>
  );
}

export default MainCom;
