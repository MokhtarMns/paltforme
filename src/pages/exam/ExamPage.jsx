// ExamResultsPage.js

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Quiz from "../../components/ui/quiz/Quiz";
import closeIcon from "../../assets/icons/close.svg";

import "./style.css";
import CountdownTimer from "../../components/ui/countdownTimer/CountdownTimer";

const ExamPage = () => {
  const [examQuestions, setExamQuesions] = useState({});
  const { examId } = useParams();
  const location = useLocation();
  const { questions, examTitle } = location.state || {};
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [examRunning, setExamRunning] = useState(true);
  const [timerEnd, setTimerEnd] = useState(false);

  useEffect(() => {
    setExamQuesions(location.state.questions);
  }, []);
  console.error({ shittah: location.state.questions });

  function handleCorrectAnswer() {
    setCorrectAnswers((correctAnswers) => correctAnswers + 1);
  }

  function handleComplete() {
    setOpenPopup(true);
    setExamRunning(false);
  }

  function getColor(value) {
    var red = "#ef5350f0";
    var orange = "#FF9843f0";
    var yellow = "#FDE767f0";
    var green = "#4caf50f0";

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
  return (
    <div className="exam-page">
      <CountdownTimer
        examTitle={examTitle}
        initialMinutes={25}
        examRunning={examRunning}
        onTimerEnd={() => {
          setTimerEnd(true);
        }}
        correct={correctAnswers}
        total={Object.keys(examQuestions).length}
      ></CountdownTimer>

      {openPopup && (
        <div className="result-popup">
          <button
            className="close-button"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <img src={closeIcon} alt="" />
          </button>
          {timerEnd ? (
            <p>Exam time has ended</p>
          ) : (
            <div>
              <p className="large">Congratulations!</p>
              <p> You've completed the exam </p>
            </div>
          )}
          <div>
            <p>Your score is</p>
            <p
              className="final-score"
              style={{
                color: getColor(
                  correctAnswers / Object.keys(examQuestions).length
                ),
              }}
            >
              {Math.ceil(
                (correctAnswers / Object.keys(examQuestions).length) * 100
              )}
              %
            </p>
          </div>
        </div>
      )}
      <div className="placeholder"></div>

      <div className="quiz-wrapper">
        {examQuestions && (
          <Quiz
            variant={"teacher_exam"}
            questionsNumber={Object.keys(examQuestions).length}
            questions={examQuestions}
            showHeader={false}
            onCorrectAnswer={handleCorrectAnswer}
            onComplete={handleComplete}
          ></Quiz>
        )}
      </div>
    </div>
  );
};

export default ExamPage;






//Fix the UseCase position

//Shema de l'architecture

//Choix Techniques d'implementation


/**
 * git config --global user.email "mansourimokhtar33@gmail.com"
git config --global user.name "MokhtarMns"

*/