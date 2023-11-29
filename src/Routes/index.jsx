import React from "react";
import {
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import SideBar from "../components/sidebar";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/categories";
import './style.scss'
import TopNav from "../components/topnavigation";

const MainApp = () => {
  return (
    <div className="layout">
      <SideBar />
      <div className="layout_content">
        <TopNav/>
        <div className="layout_content_main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
