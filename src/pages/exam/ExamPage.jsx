// ExamResultsPage.js

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Quiz from "../../components/ui/quiz/Quiz";
import closeIcon from "../../assets/icons/close.svg";

import "./style.css";
import CountdownTimer from "../../components/ui/countdownTimer/CountdownTimer";

const questions = {
  questions1: {
    question: "Which of the following is an example of encapsulation in C++?",
    answers: [
      {
        id: "a",
        text: "Combining data and methods into a single unit.",
        correct: true,
      },
      {
        id: "b",
        text: "Using inheritance to create objects from a parent class.",
        correct: false,
      },
      {
        id: "c",
        text: "Overriding methods in a child class.",
        correct: false,
      },
      {
        id: "d",
        text: "Using templates to create generic classes.",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question2: {
    question:
      "Which access specifier is used to make a class member accessible only to the class itself?",
    answers: [
      {
        id: "a",
        text: "public",
        correct: false,
      },
      {
        id: "b",
        text: "protected",
        correct: false,
      },
      {
        id: "c",
        text: "private",
        correct: true,
      },
      {
        id: "d",
        text: "default",
        correct: false,
      },
    ],
    correctAnswer: ["c"],
  },
  question3: {
    question: "Which of the following is an example of inheritance in C++?",
    answers: [
      {
        id: "a",
        text: "Creating a new class from an existing class.",
        correct: true,
      },
      {
        id: "b",
        text: "Using polymorphism to call methods from a parent class.",
        correct: false,
      },
      {
        id: "c",
        text: "Creating a new object from a parent class.",
        correct: false,
      },
      {
        id: "d",
        text: "Using templates to create generic classes.",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question4: {
    question:
      "Which type of inheritance allows a class to access the private members of its parent class?",
    answers: [
      {
        id: "a",
        text: "Single inheritance",
        correct: false,
      },
      {
        id: "b",
        text: "Multiple inheritance",
        correct: false,
      },
      {
        id: "c",
        text: "Hierarchical inheritance",
        correct: false,
      },
      {
        id: "d",
        text: "Protected inheritance",
        correct: true,
      },
    ],
    correctAnswer: ["d"],
  },
  question5: {
    question: "Which of the following is an example of polymorphism in C++?",
    answers: [
      {
        id: "a",
        text: "Overriding methods in a child class.",
        correct: true,
      },
      {
        id: "b",
        text: "Using inheritance to create objects from a parent class.",
        correct: false,
      },
      {
        id: "c",
        text: "Using templates to create generic classes.",
        correct: false,
      },
      {
        id: "d",
        text: "Encapsulating data and methods into a single unit.",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question6: {
    question: "True or False: A class can have multiple public members.",
    answers: [
      {
        id: "a",
        text: "True",
        correct: true,
      },
      {
        id: "b",
        text: "False",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question7: {
    question:
      "True or False: A child class can have access to the protected members of its parent class.",
    answers: [
      {
        id: "a",
        text: "True",
        correct: true,
      },
      {
        id: "b",
        text: "False",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question8: {
    question:
      "Fill in the blank: In C++, the default access specifier is _____.",
    answers: [
      {
        id: "a",
        text: "public",
        correct: true,
      },
      {
        id: "b",
        text: "protected",
        correct: false,
      },
      {
        id: "c",
        text: "private",
        correct: false,
      },
      {
        id: "d",
        text: "default",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
  question9: {
    question:
      "Fill in the blank: The process of deriving a new class from an existing class is called _____.",
    answers: [
      {
        id: "a",
        text: "inheritance",
        correct: true,
      },
      {
        id: "b",
        text: "encapsulation",
        correct: false,
      },
      {
        id: "c",
        text: "polymorphism",
        correct: false,
      },
      {
        id: "d",
        text: "templating",
        correct: false,
      },
    ],
    correctAnswer: ["a"],
  },
};
const ExamPage = () => {
  const [examQuestions, setExamQuesions] = useState(questions);
  const { examId } = useParams();
  const location = useLocation();

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [examRunning, setExamRunning] = useState(true);
  const [timerEnd, setTimerEnd] = useState(false);

  useEffect(() => {
    //setExamQuesions(location.state.questions);
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
        examTitle={"AI Generated Exam"}
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
