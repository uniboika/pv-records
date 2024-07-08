import "./sidebar.css";
import {
  FaChevronRight,
  FaHome,
  FaChartBar,
  FaChartPie,
  FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import logo from "../image/logo.png";

export default function Sidebar({ isOpen, toggleSidebar }) {

  return (
    <nav className={`sidebar shadow-sm ${isOpen ? "open" : "close"}`}>
      <header>
        <div className={`image-text ${isOpen ? "large" : "small"}`}>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <FaChevronRight className="toggle" onClick={toggleSidebar} />
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/">
                <FaHome className="icon" />
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/pvregistration">
                <FaChartBar className="icon" />
                <span className="text nav-text">PV Registration</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/analytics">
                <FaChartPie className="icon" />
                <span className="text nav-text">Analytics</span>
              </Link>
            </li>
            {/* <li className="nav-link">
              <Link to="/wallet">
                <FaWallet className="icon" />
                <span className="text nav-text">Wallets</span>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <Link to="/logout">
              <TbLogout2 className="icon" />
              <span className="text nav-text">Logout</span>
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}
