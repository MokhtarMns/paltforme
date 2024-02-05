import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import { BoxIcon } from "boxicons";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { Courses } from "../../../pages/courses/Courses";
import ExamIcon from "../../../assets/icons/exam.svg"

export function Sidebar({
  closed,
  updateSideBarState,
  userType,
  userName,
  avatarUrl,
}) {
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const body = bodyRef.current;
    const sidebar = sidebarRef.current;
    const toggle = toggleRef.current;

    const toggleSidebar = () => {
      sidebar.classList.toggle("close");
      updateSideBarState();
    };

    const openSidebar = () => {
      sidebar.classList.remove("close");
      updateSideBarState();
    };

    toggle.addEventListener("click", toggleSidebar);

    return () => {
      toggle.removeEventListener("click", toggleSidebar);
    };
  }, []);

  return (
    <nav className="sidebar close" ref={sidebarRef}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="https://i.stack.imgur.com/frlIf.png" alt="" />
          </span>
          <div className="text logo-text">
            <span className="name">{userName}</span>
            <span className="profession">{userType}</span>
          </div>
        </div>
        <i
          className="bx bx-chevron-right toggle toggle-button"
          ref={toggleRef}
        ></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/courses">
                <i className="bx bx-book icon"></i>
                <span className="text nav-text">Modules</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/exams">
                <i className="bx bx-pencil icon"></i>
                <span className="text nav-text">Exams</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/tools">
                <i className="bx bx-wrench icon"></i>
                <span className="text nav-text">Tools</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/analytics">
                <i className="bx bx-pie-chart-alt icon"></i>
                <span className="text nav-text">Analytics</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <i className="bx bx-cog icon"></i>
            <span className="text nav-text">Settings</span>
          </li>
          <li className="">
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Logout</span>
          </li>
        </div>
      </div>
    </nav>
  );
}
