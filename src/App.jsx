import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login"; // Importing default export
import { Student } from "./pages/student/Student";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/*" element={<Student />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
