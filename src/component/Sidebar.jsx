import React from 'react';
import { 
  BsGrid1X2Fill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsListCheck, 
  BsMenuButtonWideFill, 
  BsFillGearFill 
} from 'react-icons/bs';
import { FaCar, FaCarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const handleLinkClick = () => {
    if (openSidebarToggle) {
      OpenSidebar(); 
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaCar className="icon_header" /> EV Dashboard
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/" onClick={handleLinkClick}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/vehicles" onClick={handleLinkClick}>
            <FaCarAlt className="icon" /> Vehicles
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/categories" onClick={handleLinkClick}>
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="#" onClick={handleLinkClick}>
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="#" onClick={handleLinkClick}>
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
