// Dashboard.jsx

import React, { useState, useEffect } from "react";
import TaskChart from "../../components/ui/tastChart/TaskChart";
import badge from "../../assets/images/badge_red.png";
import "./style.css";
import ModuleProgress from "../../components/ui/moduleProgress/ModuleProgress";
import RadarChart from "../../components/ui/radarChart/RadarChart";
import TimeSpentChart from "../../components/ui/timeSpentChart/TimeSpentChart";
const Dashboard = () => {
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [answersCount, setAnswersCount] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);

  const [loading, setLoading] = useState(true);

  const modulesData = [
    { module: "Module A", questionsAnswered: 20 },
    { module: "Module B", questionsAnswered: 15 },
    { module: "Module c", questionsAnswered: 15 },
    { module: "Module d", questionsAnswered: 1 },
    { module: "Module e", questionsAnswered: 15 },
    // Add more data points as needed
  ];

  const totalTasksSolved = completedConcepts.reduce(
    (total, entry) => total + entry.tasksSolved,
    0
  );

  const modules = JSON.parse(localStorage.getItem("userData")).classes[0]
    .modules;
  console.log({ modules });

  const fetchCompletedConcepts = async () => {
    try {
      const response = await fetch("http://localhost:5000/completedConcepts");
      const data = await response.json();

      if (response.ok) {
        console.log({ some_shit: data.concepts });
        setCompletedConcepts(data.concepts);
      } else {
        console.error("Failed to fetch completed concepts:", data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed concepts:", error.message);
      setLoading(false);
    }
  };

  const fetchAnswersCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/answersCount");
      const data = await response.json();

      if (response.ok) {
        console.log("ANSWERS COUNTER", data.modules);
        setAnswersCount(data.modules);
      } else {
        console.error("Failed to fetch modules list:", data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch modules list error:", error.message);
      setLoading(false);
    }
  };

  function getColor(value) {
    var red = "#ef5350f0";
    var orange = "#FF9843f0";
    var yellow = "#FDE767f0";
    var green = "#4caf50f0";

    // Determine the current color range
    var colorRange;
    if (value >= 0 && value < 0.25) {
      return red;
    } else if (value >= 0.25 && value < 0.5) {
      return orange;
    } else if (value >= 0.5 && value < 0.75) {
      return yellow;
    } else {
      return green;
    }
  }

  useEffect(() => {
    fetchCompletedConcepts();
    fetchAnswersCount();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="row-group">
        <div className="user-status">
          <div className="user">
            <div className="avatar">
              <img src="https://i.stack.imgur.com/frlIf.png" alt="" />
            </div>
            <div className="user-info">
              <h2>Mokhtar Mansouri</h2>
              <p className="rank">Task Master</p>
            </div>
          </div>
        </div>
        <div className="total-stats">
          <div className="stat">
            <div
              className="stat-circle"
              style={{ color: getColor(totalProgress / 100) }}
            >
              <p>{Math.ceil(totalProgress)}</p>
            </div>
            <p>Progress</p>
          </div>
        </div>
      </div>
      <div className="dashboard-grid">
        
        <div className="card solved-tasks-card">
          <h2>{`${totalTasksSolved} ${
            totalTasksSolved <= 1 ? "Course" : "Courses"
          }`}</h2>
          <p className="xyz">Completed this week</p>
          <TaskChart data={completedConcepts}></TaskChart>
        </div>
        <div className="card solved-tasks-card">
          <h2 className="xyz">Time Spent</h2>
          <TimeSpentChart></TimeSpentChart>
        </div>
        <div className="card no-padding">
          <h2>Effort Distribution</h2>
          <div className="radar-chart">
            <RadarChart data={answersCount}></RadarChart>
          </div>
        </div>
        <div className="card chapters-card">
          <h2>Chapters Progress</h2>
          <ModuleProgress
            modules={modules}
            setTotalProgress={setTotalProgress}
          ></ModuleProgress>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
