import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import { Courses } from "../../../pages/courses/Courses";
import { Emails } from "../../../pages/emails/Emails";
import { Tools } from "../../../pages/tools/Tools";
import { Chapters } from "../chapters/Chapters";
import { Course } from "../../../pages/course/Course";
import GenerateExamPage from "../../../pages/generateExam/GenerateExam";
import ExamPage from "../../../pages/exam/ExamPage";
import Dashboard from "../../../pages/dashboard/Dashboard";

export function MainContent({ closed }) {
  useEffect(() => {
    console.log("MainContent re-rendered:", closed); // Log when MainContent re-renders
  }, [closed]);
  const mainContentStyle = {
    marginLeft: closed ? "200px" : "50px",
    transition: "margin-left 0.3s ease",
  };

  return (
    <div className="main-content" style={mainContentStyle}>
      <Routes>
        <Route path="/courses" element={<Courses />}></Route>
        <Route
          path="/exams"
          element={<Courses forExam={true}></Courses>}
        ></Route>
        <Route path="/exams/:courseId/:examId" element={<ExamPage />}></Route>
        <Route path="/exams/:courseId/generate" element={<GenerateExamPage></GenerateExamPage>}></Route>
        <Route path="/exams/:courseId/generated" element={<ExamPage></ExamPage>}></Route>
        <Route path="/tools" element={<Tools />}></Route>
        <Route path="/analytics" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/courses/:courseId"
          element={<Chapters></Chapters>}
        ></Route>
        <Route
          path="/exams/:courseId"
          element={<Chapters variant="exams"></Chapters>}
        ></Route>
        <Route
          path="/courses/:moduleId/:chapterId"
          element={<Course></Course>}
        ></Route>
      </Routes>
    </div>
  );
}
