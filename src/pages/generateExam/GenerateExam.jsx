import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

import "./style.css";
const GenerateExamPage = () => {
  // Sample data for available chapters, exam types, and difficulty levels

  const examTypes = [
    "Practice Exam",
    "Quiz Challenge",
    "Comprehensive Assessment",
  ];

  const examModalities = [
    "Multi Choices",
    "True / False",
    "Guess Code Output",
    "Fill the Gaps",
    "Kech 7aja",
  ];
  const difficultyLevels = ["Easy", "Intermediate", "Advanced"];
  const { userData } = useContext(UserContext);

  // State to manage selected chapters, exam type, and difficulty level
  const [availableChapters, setAvailableChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const { courseId } = useParams();

  const getChaptersForModule = (moduleId) => {
    if (userData && userData.classes) {
      for (const userClass of userData.classes) {
        for (const module of userClass.modules) {
          if (module.id === moduleId) {
            // Found the module, return its chapters
            return module.chapters;
          }
        }
      }
    }
    return []; // Return empty array if no data or module not found
  };
  // Function to handle chapter selection
  const handleChapterClick = (chapter) => {
    const isChapterSelected = selectedChapters.includes(chapter);
    if (isChapterSelected) {
      setSelectedChapters(
        selectedChapters.filter(
          (selectedChapter) => selectedChapter !== chapter
        )
      );
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  };

  // Function to handle exam type selection
  const handleExamTypeChange = (event) => {
    setSelectedExamType(event.target.value);
  };

  // Function to handle difficulty level selection
  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  // Function to submit the customized exam
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        chapters: selectedChapters,
        examType: selectedExamType,
        difficulty: selectedDifficulty,
      }),
    });

    if (!response.ok) {
      throw new Error("Error fetching /exam");
      return;
    }
    const data = await response.json();

    navigate(`/exams/${courseId}/generated`, {
      state: {
        questions: data.questions,
      },
    });
  };

  const location = useLocation();

  // Access the passed state

  useEffect(() => {
    const chapters = location.state && location.state.chapters;

    const chatpersTitle = chapters.map((chapter) => {
      return chapter.title;
    });
    console.warn({ chatpersTitle });
    setAvailableChapters(chatpersTitle);
    //setAvailableChapters();
  }, []);

  return (
    <div className="exam">
      <div className="center-card">
        <h1>Build You Exam</h1>
        <div>
          <fieldset>
            <legend>Chapters</legend>
            <div className="tags">
              {availableChapters.map((chapter) => (
                <span
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter)}
                  className={
                    selectedChapters.includes(chapter) ? "selected" : ""
                  }
                >
                  {chapter}
                </span>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Exam Type</legend>
            <select
              required
              value={selectedExamType}
              onChange={handleExamTypeChange}
            >
              <option value="">--Select Exam Type--</option>
              <optgroup label="Types">
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </optgroup>
            </select>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Exam Modalities</legend>
            <div className="tags">
              {examModalities.map((chapter) => (
                <span
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter)}
                  className={
                    selectedChapters.includes(chapter) ? "selected" : ""
                  }
                >
                  {chapter}
                </span>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Difficulty Level</legend>
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="">--Select Difficulty Level--</option>
              <optgroup label="Levels">
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </optgroup>
            </select>
          </fieldset>
        </div>

        <button onClick={handleSubmit} type="submit" className="start-exam">
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default GenerateExamPage;
