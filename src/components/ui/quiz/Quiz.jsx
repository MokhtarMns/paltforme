import React, { useState, useEffect, memo } from "react";
import "./style.css";
import submitIcon from "../../../assets/icons/send.svg";
import bot from "../../../assets/images/chat-bot.svg";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const Quiz = memo(
  ({
    questions,
    onClose,
    onReload,
    conceptId,
    onQuizResult,
    completed,
    variant,
    questionsNumber,
    reload,
    moduleId,
    showHeader = true,
    onCorrectAnswer,
    onComplete,
  }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState([]);
    const [scores, setScores] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [feedbackColor, setFeedbackColor] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [answered, setAnswered] = useState(completed);
    const [count, setCount] = useState(0);
    const [answersCount, setAnswersCount] = useState(0);

    const [congrats, setShowCongrats] = useState(false);

    useEffect(() => {
      //setUserAnswers({});
      //setScores({});
      //setShowScore(false);
      //setSubmittedQuestions([]);
      setFeedbackColor(null);
      setShowFeedback(false);
    }, []);
    const completeConcept = async () => {
      try {
        // Send concept content to the local server and receive questions
        const response = await fetch(
          `http://localhost:5000/complete/${conceptId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz questions");
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    const answersCounting = async () => {
      console.log("YOUR ANSWER WILL BE COUNTED");
      try {
        // Send concept content to the local server and receive questions
        const response = await fetch(
          `http://localhost:5000/incrementAnswersCount/${moduleId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz questions");
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    const handleAnswerSelect = (questionId, answerId) => {
      setUserAnswers((prevAnswers) => {
        const isSelected = (prevAnswers[questionId] || []).includes(answerId);
        if (isSelected) {
          return {
            ...prevAnswers,
            [questionId]: prevAnswers[questionId].filter(
              (id) => id !== answerId
            ),
          };
        } else {
          return {
            ...prevAnswers,
            [questionId]: [...(prevAnswers[questionId] || []), answerId],
          };
        }
      });
    };

    const handleSubmit = (questionId) => {
      let newScores = {};
      const totalAnswers = answersCount + 1;
      setAnswersCount(totalAnswers);
      if (totalAnswers == questionsNumber) {
        onComplete();
      }

      setSubmittedQuestions((prevSubmittedQuestions) => [
        ...prevSubmittedQuestions,
        questionId,
      ]);
      if (userAnswers.hasOwnProperty(questionId)) {
        const userAnswer = userAnswers[questionId].sort();
        const correctAnswer = questions[questionId].correctAnswer.sort();

        if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
          answersCounting();
          newScores[questionId] = 1;
          let newCount = count + 1;
          setCount(newCount);
          setFeedbackColor("green");
          onCorrectAnswer();
          console.log("Total: ", questionsNumber, "count: ", newCount);
          if (newCount == questionsNumber) {
            //onQuizResult(conceptId, true);
            //setAnswered(true);

            if (variant != "teacher_exam") {
              completeConcept();
              setShowCongrats(true);
              setTimeout(() => {
                setShowCongrats(false);
              }, 2600);
            }
          }
        } else {
          newScores[questionId] = 0;
          setFeedbackColor("red");
          setFeedbackColor("red");
        }
      }

      setScores((oldScores) => ({ ...oldScores, ...newScores }));

      if (variant != "teacher_quiz" && variant != "teacher_exam") {
        setShowScore(true);
      }

      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 1400);
    };

    const getTotalScore = () => {
      return Object.values(scores).reduce((acc, score) => acc + score, 0);
    };

    return (
      <div>
        {showFeedback && (
          <div className={`feedback-popup ${feedbackColor}`}>
            <p className="feedback-message">
              {feedbackColor === "green"
                ? "Nice! Your answer is correct."
                : "Ooh! Your answer is incorrect."}
            </p>
          </div>
        )}
        {congrats && (
          <div className="congrats">
            <img src={bot} alt="" />
            <p>
              You finished this task. <span>Congratulations!</span>
            </p>
          </div>
        )}
        {showHeader && (
          <div className="text-with-divider">
            <p style={{ color: `${answered && "#4caf50"}` }}>
              {variant == "teacher_quiz" || variant == "teacher_exam"
                ? "Answer the questions below"
                : "AI generated questions"}
            </p>
            <div className="horizontal-divider"></div>
          </div>
        )}
        <div className="questions">
          {Object.keys(questions).map((questionId, index) => (
            <div key={questionId} className="question">
              <p>
                <span className="bold">{index + 1}.</span>{" "}
                {questions[questionId].question}
              </p>
              <div className="answers">
                {questions[questionId].answers.map((answer, index) => (
                  <button
                    className="answer"
                    key={answer.id}
                    style={{
                      backgroundColor:
                        variant == "teacher_exam" &&
                        submittedQuestions.includes(questionId) &&
                        scores[questionId] == 0
                          ? questions[questionId].correctAnswer?.includes(
                              answer.id
                            )
                            ? "#4caf50"
                            : "#ef5350"
                          : completed &&
                            questions[questionId].correctAnswer?.includes(
                              answer.id
                            )
                          ? "#4caf50"
                          : submittedQuestions.includes(questionId) &&
                            (variant == "teacher_quiz" ||
                              variant == "teacher_exam") &&
                            scores[questionId]
                          ? questions[questionId].correctAnswer?.includes(
                              answer.id
                            )
                            ? "#4caf50"
                            : ""
                          : userAnswers[questionId]?.includes(answer.id) &&
                            (submittedQuestions.includes(questionId)
                              ? scores[questionId]
                                ? questions[questionId].correctAnswer?.includes(
                                    answer.id
                                  )
                                  ? "#4caf50"
                                  : "#ef5350"
                                : variant == "teacher_quiz" ||
                                  variant == "teacher_exam"
                                ? "var(--clr-highlight)"
                                : questions[questionId].correctAnswer?.includes(
                                    answer.id
                                  )
                                ? "#4caf50"
                                : "#ef5350"
                              : "var(--clr-highlight)"),
                    }}
                    onClick={() => {
                      completed ||
                      (submittedQuestions.includes(questionId) &&
                        scores[questionId] != 0)
                        ? () => {}
                        : handleAnswerSelect(questionId, answer.id);
                    }}
                    disabled={
                      completed ||
                      scores[questionId] == 1 ||
                      (variant == "teacher_exam" &&
                        submittedQuestions.includes(questionId) &&
                        scores[questionId] == 0)
                    }
                  >
                    <span className="bold">{letters[index]}</span>
                    {"\u00A0\u00A0\u00A0"}
                    {answer.text}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleSubmit(questionId)}
                className="submit-button"
                disabled={
                  completed ||
                  (submittedQuestions.includes(questionId) &&
                    scores[questionId]) ||
                  (variant == "teacher_exam" &&
                    submittedQuestions.includes(questionId) &&
                    scores[questionId] == 0)
                }
                style={{
                  backgroundColor: completed
                    ? "#4caf50"
                    : submittedQuestions.includes(questionId) &&
                      (scores[questionId] ? "#4caf50" : "#ef5350"),
                }}
              >
                <span className="text">
                  {completed
                    ? "Correct Answer"
                    : submittedQuestions.includes(questionId)
                    ? scores[questionId]
                      ? "Correct Answer"
                      : "Wrong Answer"
                    : "Submit Answer"}
                </span>
                {completed || submittedQuestions.includes(questionId) ? (
                  <></>
                ) : (
                  <img src={submitIcon} alt="" />
                )}
              </button>
            </div>
          ))}
        </div>
        {showScore && (
          <div className="score-section">
            <p>Your total score is: {getTotalScore()}</p>
            <div className="buttons-row">
              <button onClick={onClose}>Close</button>
              <button
                onClick={() => {
                  setAnswered({});
                  setScores({});
                  onReload();
                }}
              >
                New Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Quiz;
