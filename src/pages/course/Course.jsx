import { useState, useEffect, useContext, useRef, createFactory } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import preview from "../../assets/images/illustration-article.svg";
import testIcon from "../../assets/icons/test.svg";
import closeIcon from "../../assets/icons/close.svg";
import explainIcon from "../../assets/icons/idea_also.svg";
import questionIcon from "../../assets/icons/question.svg";
import botIcon from "../../assets/images/chat-bot.svg";
import sendMessageIcon from "../../assets/icons/send_question.svg";

import chevronIcon from "../../assets/icons/down.svg";
import { UserContext } from "../../providers/UserProvider";
import "./style.css";
import Quiz from "../../components/ui/quiz/Quiz";
import Draggable from "react-draggable";

import hljs from "highlight.js";

import "highlight.js/styles/github-dark-dimmed.css"; // Import default styles

import cpp from "highlight.js/lib/languages/cpp"; // Import the C++ language module

hljs.registerLanguage("cpp", cpp);

const Popup = ({
  selectedText,
  coordinates,
  onExplainClick,
  explanation,
  onClose,
}) => {
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState();
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);

  const style = {
    position: "absolute",
    top: coordinates.top + window.scrollY + 10,
    left: coordinates.left + window.scrollX,
  };

  function handleExplainClick() {
    setExplanationOpen(true);
    setQuestionOpen(false);
    onExplainClick();
  }

  function handleQuestionClick() {
    setQuestionOpen(true);
    setExplanationOpen(false);
  }

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    setWaitingForAnswer(true);
    setAnswer();
    try {
      // Send concept content to the local server and receive questions
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conceptContent: " ",
          selectedText: selectedText,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions");
      }

      const resposeAnswer = await response.text();
      setWaitingForAnswer(false);
      setAnswer(resposeAnswer);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  return (
    <div style={style}>
      {explanationOpen ? (
        <Draggable>
          <div className="explanation-popup">
            <div className="explanation-header" draggable>
              <p>Explanation of</p>{" "}
              <div
                className="close-button"
                onClick={() => onClose(setExplanationOpen)}
              >
                <img src={closeIcon} alt="" />
              </div>
            </div>
            <div className="explanation-content">
              {explanation ? (
                <>
                  <div className="explained-text">{selectedText}</div>
                  <div className="divider"></div>
                  <div className="exp-text">
                    {explanation.replace(/"/g, "")}
                  </div>
                </>
              ) : (
                <div className="exp-text">
                  <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Draggable>
      ) : questionOpen ? (
        <Draggable>
          <div className="explanation-popup">
            <div className="explanation-header" draggable>
              <p>Ask a question</p>{" "}
              <div
                className="close-button"
                onClick={() => onClose(setExplanationOpen, setQuestionOpen)}
              >
                <img src={closeIcon} alt="" />
              </div>
            </div>
            <div className="question-content">
              <>
                <div className="explained-text">{selectedText}</div>
                <div className="divider"></div>
                {answer ? (
                  <div className="exp-text">{answer.replace(/"/g, "")}</div>
                ) : (
                  waitingForAnswer && (
                    <div className="exp-text">
                      <div class="three-body">
                        <div class="three-body__dot"></div>
                        <div class="three-body__dot"></div>
                        <div class="three-body__dot"></div>
                      </div>
                    </div>
                  )
                )}
              </>
            </div>
            <div className="flex-group">
              <img
                className="icon"
                src={sendMessageIcon}
                alt=""
                onClick={handleQuestionSubmit}
              />
              <form onSubmit={handleQuestionSubmit}>
                <input
                  type="text"
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                  }}
                  placeholder="Ask AI about your selection"
                  required
                />
              </form>
            </div>
          </div>
        </Draggable>
      ) : (
        <div className="popup">
          <div className="button" onClick={handleExplainClick}>
            <img src={explainIcon} alt="" />
            Explain
          </div>
          <div className="button" onClick={handleQuestionClick}>
            <img src={questionIcon} alt="" />
            Question
          </div>
        </div>
      )}
    </div>
  );
};

export function Course() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [concepts, setConcepts] = useState();
  ``;
  const divRefs = Array.from({ length: 2 }).map(() => useRef(null));
  const [selectedText, setSelectedText] = useState(null);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [textCotext, setTextContext] = useState(null);
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [selectionHandled, setSelectionHandled] = useState(false);
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [value, forReload] = useState(1);
  const handleDocumentClick = (e) => {
    setPopupIsOpen(false);
    e.preventDefault();

    const isInsidePopup =
      e.target.classList.contains("popup") || e.target.closest(".popup");
    if (isInsidePopup == null && popupIsOpen) {
      ``;
      console.log("set to false");
    }
    return false;
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleDocumentClick);

    return () => {
      document.removeEventListener("contextmenu", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    // Initialize highlight.js

    setTimeout(() => {
      document.querySelectorAll("code").forEach((contentDiv) => {
        contentDiv.innerHTML = contentDiv.textContent.replace(/\\n/g, "\n");
      });

      setTimeout(() => {
        document.querySelectorAll("code").forEach((block) => {
          hljs.highlightBlock(block);
        });
      }, 2000);
    }, 1000);
  }, []);

  const handleSelection = (conceptIndex) => () => {
    if (!selectionHandled) {
      const selection = window.getSelection();
      const selectedText = selection.toString();

      if (selectedText) {
        var e = window.event;

        var posX = e.clientX;
        var posY = e.clientY;
        setCoordinates({ top: posY, left: posX });
        setSelectedText(selectedText);
        console.log("set to true");
        setPopupIsOpen(true);
      }

      setSelectionHandled(true);
    }
  };

  const resetSelectionHandled = () => {
    setSelectionHandled(false);
  };

  const pastelColors = [
    "#AFC8AD",
    "#29ADB2",
    "#F7B787",
    "#88AB8E",
    "#8ADAB2",
    "#FF8F8F",
    "#61A3BA",
    "#B5CB99",
  ];

  const { moduleId, chapterId } = useParams();

  const getChapterTitle = (chapterId) => {
    const module = JSON.parse(
      localStorage.getItem("userData")
    ).classes?.[0]?.modules.find((module) =>
      module.chapters.some((chapter) => chapter.id === chapterId)
    );

    if (module) {
      const chapter = module.chapters.find(
        (chapter) => chapter.id === chapterId
      );
      return chapter?.title || "Chapter Not Found";
    }

    return "Module Not Found";
  };

  const getChapterOrder = (chapterId) => {
    console.log({ chapterId });
    const module = JSON.parse(
      localStorage.getItem("userData")
    ).classes?.[0]?.modules.find((module) =>
      module.chapters.some((chapter) => chapter.id === chapterId)
    );

    if (module) {
      const chapter = module.chapters.find(
        (chapter) => chapter.id === chapterId
      );
      return chapter?.order || 1;
    }

    return 1;
  };

  function getColor(value) {
    var red = "#bd0524";
    var orange = "#bd6405";
    var yellow = "#bda405";
    var green = "#009966";

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
  const [visibleConcepts, setVisibleConcepts] = useState([]);
  const [explanation, setExplanation] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [completedConcepts, setCompletedConcepts] = useState([]);

  const handleQuizResult = (conceptId, isCorrect) => {
    if (isCorrect && !completedConcepts.includes(conceptId)) {
      setCompletedConcepts((prevCompletedConcepts) => [
        ...prevCompletedConcepts,
        conceptId,
      ]);
    }
  };

  const handleQuizButtonClick = async (event, concept) => {
    event.stopPropagation();
    setLoadingQuiz(true);
    setSelectedConcept(concept);
    try {
      // Send concept content to the local server and receive questions
      const response = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conceptContent: concept.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions");
      }

      const questionMap = await response.json();
      setQuizQuestions(questionMap.questions);
      setLoadingQuiz(false);
      setShowQuiz(true);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  // Function to toggle the visibility of a concept's body
  const toggleConceptVisibility = (conceptId) => {
    setVisibleConcepts((prevVisibleConcepts) => {
      const updatedVisibleConcepts = [...prevVisibleConcepts];
      const index = updatedVisibleConcepts.indexOf(conceptId);

      if (index !== -1) {
        updatedVisibleConcepts.splice(index, 1);
      } else {
        updatedVisibleConcepts.push(conceptId);
      }

      return updatedVisibleConcepts;
    });
  };

  function safeJSONParse(jsonString) {
    console.log({ jsonString });
    try {
      return JSON.parse(jsonString) || {}; // If parsing fails, return an empty object
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      return {}; // Return an empty object in case of an error
    }
  }

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/concepts/${chapterId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const conceptsData = await response.json();

        setConcepts(conceptsData.concepts);

        setCompletedConcepts(
          conceptsData.concepts
            .filter((concept) => concept.completed)
            .map((concept) => concept.id)
        );
      } catch (error) {
        console.error("Error fetching concepts:", error);
      }
    };
    fetchConcepts();
  }, []);

  const onPopupClose = (setExplanationOpen, setQuestionOpen) => {
    // Reset the explanation and close the popup
    setExplanation("");
    setExplanationOpen(false);
    setQuestionOpen(false);
  };
  const handleExplainClick = async () => {
    const selectedDivContent = divRefs
      .map((ref) => (ref.current ? ref.current.innerText : ""))
      .join("\n");

    try {
      const response = await fetch(`http://localhost:5000/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: selectedText,
          context: selectedDivContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseBody = await response.json();
      console.log("=>", responseBody.explanation);
      setExplanation(responseBody.explanation);
    } catch (error) {
      console.error("Error fetching concepts:", error);
    }
  };

  return (
    <div className="course">
      <div className="tasks">
        <div
          className="tasks-header"
          style={{
            backgroundColor: "#AFC8ED",
          }}
        >
          <div className="overlay">
            <p className="module-title">{moduleId.replace(/_/g, " ")}</p>
            <p className="chapter-title">{getChapterTitle(chapterId)}</p>
          </div>
        </div>

        {concepts && (
          <>
            <div className="progress">
              <div
                className="indicator"
                style={{
                  width: `${
                    (concepts.filter((concept) => concept.completed).length /
                      concepts.length) *
                    100
                  }%`,

                  backgroundColor: `${getColor(
                    concepts.filter((concept) => concept.completed).length /
                      concepts.length
                  )}`,
                }}
              >
                <p>
                  {(concepts.filter((concept) => concept.completed).length /
                    concepts.length) *
                    100}
                  %
                </p>
              </div>
            </div>

            {concepts.map((concept, index) => (
              <div
                className={`task ${
                  visibleConcepts.includes(concept.id) ? "open" : ""
                }`}
                key={concept.id}
              >
                <div
                  className="task-header"
                  style={{
                    backgroundColor: completedConcepts.includes(concept.id)
                      ? "#0D2626"
                      : "",
                  }}
                >
                  <div className="row">
                    <div
                      className="complete-indicator"
                      style={{
                        backgroundColor: completedConcepts.includes(concept.id)
                          ? "#009966"
                          : "#203246",
                      }}
                    ></div>
                    <p>{concept.title}</p>
                  </div>

                  {false && (
                    <div
                      className="test-button"
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                      onClick={(event) => handleQuizButtonClick(event, concept)}
                    >
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="inherit"
                          stroke="none"
                        >
                          <path
                            d="M565 4791 c-90 -22 -172 -90 -215 -176 l-25 -50 0 -2005 0 -2005 23
-45 c35 -72 75 -114 144 -151 l63 -34 632 0 c622 0 632 0 659 21 53 39 69 71
69 134 0 63 -16 95 -69 134 -27 21 -39 21 -617 24 l-589 2 0 1920 0 1920 799
0 800 0 3 -362 c3 -354 4 -364 26 -408 35 -72 75 -114 144 -151 l63 -34 362
-3 362 -3 3 -429 c3 -415 4 -429 24 -456 39 -53 71 -69 134 -69 63 0 95 16
134 69 20 27 21 40 24 539 2 282 0 528 -3 547 -5 30 -82 111 -513 544 -290
290 -521 514 -539 522 -27 12 -185 14 -950 13 -505 -1 -931 -4 -948 -8z m2205
-746 l205 -205 -208 0 -207 0 0 205 c0 113 1 205 3 205 1 0 94 -92 207 -205z"
                          />
                          <path
                            d="M1055 3186 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 25
-8 184 -10 474 -8 423 3 437 4 464 24 53 39 69 71 69 134 0 63 -16 95 -69 134
-27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z"
                          />
                          <path
                            d="M4170 2862 c-36 -9 -87 -30 -115 -46 -60 -34 -1584 -1549 -1620
-1611 -30 -51 -195 -670 -195 -732 0 -82 70 -153 151 -153 40 0 681 165 723
187 41 20 1556 1533 1601 1598 70 101 102 262 76 388 -29 135 -131 271 -249
331 -112 57 -247 71 -372 38z m237 -328 c43 -32 65 -69 70 -117 8 -68 -3 -110
-42 -153 l-34 -39 -127 127 -128 127 23 25 c40 43 80 57 148 53 43 -2 71 -9
90 -23z m-357 -409 l125 -125 -448 -448 -447 -447 -127 128 -128 127 445 445
c245 245 447 445 450 445 3 0 61 -56 130 -125z m-1120 -1120 l125 -125 -50
-49 c-50 -48 -51 -49 -215 -89 -90 -22 -166 -40 -167 -39 -1 1 17 77 39 167
40 161 42 166 86 213 26 26 49 47 52 47 3 0 61 -56 130 -125z"
                          />
                          <path
                            d="M1055 2546 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 25
-8 305 -10 874 -8 827 3 837 3 864 24 53 39 69 71 69 134 0 63 -16 95 -69 134
-27 21 -36 21 -874 23 -689 2 -853 0 -877 -11z"
                          />
                          <path
                            d="M1055 1906 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 25
-8 257 -10 714 -8 665 3 677 3 704 24 53 39 69 71 69 134 0 63 -16 95 -69 134
-27 21 -38 21 -714 23 -556 2 -693 0 -717 -11z"
                          />
                        </g>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`concept-toggle ${
                      visibleConcepts.includes(concept.id) ? "rotate" : ""
                    }`}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => toggleConceptVisibility(concept.id)}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000, 512.000000) scale(0.100000, -0.100000)"
                        fill="inherit"
                        stroke="none"
                      >
                        <path
                          d="M880 3427 c-53 -17 -133 -102 -149 -160 -16 -55 -11 -118 13 -168 9
-20 367 -384 859 -875 899 -897 862 -864 957 -864 95 0 58 -33 957 864 492
491 850 855 859 875 44 93 26 191 -50 266 -71 71 -145 90 -240 63 -35 -10
-141 -111 -784 -752 l-742 -741 -743 741 c-642 641 -748 742 -783 752 -50 14
-107 14 -154 -1z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div
                  className={`task-body ${
                    completedConcepts.includes(concept.id) &&
                    "completed-concept"
                  }`}
                >
                  <div className="concept-content">
                    <div
                      className="documentation"
                      ref={divRefs[index]}
                      onMouseUp={handleSelection(index)}
                      onMouseDown={resetSelectionHandled}
                      dangerouslySetInnerHTML={{ __html: concept.content }}
                    ></div>
                    <div className="questions">
                      <Quiz
                        questions={safeJSONParse(concept.questions)}
                        conceptId={concept.id}
                        completed={concept.completed}
                        variant="teacher_quiz"
                        questionsNumber={
                          Object.keys(safeJSONParse(concept.questions)).length
                        }
                        reload={setConcepts}
                        onQuizResult={(isCorrect) =>
                          handleQuizResult(concept.id, isCorrect)
                        }
                        moduleId={moduleId}
                      ></Quiz>
                    </div>

                    {(!showQuiz || selectedConcept !== concept) &&
                      !loadingQuiz && (
                        <>
                          <div className="horizontal-divider"></div>
                          <div className="ai-challenge">
                            <div
                              className="bot-container"
                              style={{ backgroundImage: `url(${botIcon})` }}
                            ></div>
                            <p>Ready for AI challenge ?</p>
                            <button
                              className="btn"
                              onClick={(event) =>
                                handleQuizButtonClick(event, concept)
                              }
                            >
                              <svg
                                height="24"
                                width="24"
                                fill="#FFFFFF"
                                viewBox="0 0 24 24"
                                data-name="Layer 1"
                                id="Layer_1"
                                class="sparkle"
                              >
                                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                              </svg>

                              <span className="text">Generate Quiz</span>
                            </button>
                          </div>
                        </>
                      )}
                  </div>
                  {loadingQuiz ? (
                    <div className="loading">
                      <div class="three-body">
                        <div class="three-body__dot"></div>
                        <div class="three-body__dot"></div>
                        <div class="three-body__dot"></div>
                      </div>{" "}
                      Generating Quiz
                    </div>
                  ) : (
                    showQuiz &&
                    selectedConcept === concept && (
                      <Quiz
                        questions={quizQuestions}
                        onClose={() => {
                          setShowQuiz(false);
                          setLoadingQuiz(false);
                        }}
                        onReload={() => {
                          handleQuizButtonClick(event, concept);
                        }}
                        questionsNumber={
                          Object.keys(safeJSONParse(concept.questions)).length +
                          1
                        }
                        conceptId={concept.id}
                        onQuizResult={(isCorrect) =>
                          handleQuizResult(concept.id, isCorrect)
                        }
                        completed={false}
                        moduleId={moduleId}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {popupIsOpen && (
        <Popup
          selectedText={selectedText}
          coordinates={coordinates}
          onExplainClick={handleExplainClick}
          explanation={explanation}
          onClose={onPopupClose}
        />
      )}
    </div>
  );
}
