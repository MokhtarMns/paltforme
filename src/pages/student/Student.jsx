import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import { BoxIcon } from "boxicons";
import "boxicons/css/boxicons.min.css";
import { Sidebar } from "../../components/ui/sidebar/Sidebar";
import { MainContent } from "../../components/ui/main-content/MainContent";

export function Student() {
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed((prev) => !prev);
  };

  useEffect(() => {}, [isSidebarClosed]);

  return (
    <div className="container">
      <Sidebar
        closed={isSidebarClosed}
        updateSideBarState={toggleSidebar}
        userType={"Student"}
        userName={"Mokhtar M."}
        avatarUrl={"https://i.pinimg.com/originals/66/83/da/6683da6fc8f5321d2dcb6023e03df4fb.png"}
      ></Sidebar>
      <MainContent closed={isSidebarClosed}></MainContent>
    </div>
  );
}
