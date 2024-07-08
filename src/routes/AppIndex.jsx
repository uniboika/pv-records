import React, { useState } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import AppNavigation from "./AppNavigation";

export default function AppIndex() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`d-flex ${isOpen ? "sidebar-open" : "sidebar-close"}`}>
      <div>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="home">
        <AppNavigation />
      </div>
    </div>
  );
}
