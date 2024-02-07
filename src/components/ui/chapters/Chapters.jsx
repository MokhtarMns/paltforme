import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./style.css";
import { BoxIcon } from "boxicons";
import "boxicons/css/boxicons.min.css";
import { UserContext } from "../../../providers/UserProvider";
import passed from "../../../assets/icons/passed.svg";

export function Chapters({ variant = "courses" }) {
  const [courses, setCourses] = useState([]);

  const [exams, setExams] = useState();
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const pastelColors = [
    "#AFC8AD",
    "hsl(182, 63%, 33%)",
    "hsl(26, 88%, 35%)",
    "#88AB8E",
    "#8ADAB2",
    "#FF8F8F",
    "#61A3BA",
    "#B5CB99",
  ];
  const { courseId } = useParams();
  const courseName = courseId.replace(/_/g, " ");
  useEffect(() => {
    const getChaptersForModule = (moduleId) => {
      if (
        JSON.parse(localStorage.getItem("userData")) &&
        JSON.parse(localStorage.getItem("userData")).classes
      ) {
        for (const userClass of JSON.parse(localStorage.getItem("userData"))
          .classes) {
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
    const fetchChapters = async () => {
      try {
        const response = await fetch("http://localhost:5000/chapters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: courseId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const coursesData = await response.json();

        setCourses(coursesData.chapters);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5000/exams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: courseId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const examsData = await response.json();

        setExams(examsData.exams);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    console.log(getChaptersForModule(courseId));
    //setCourses(getChaptersForModule(courseId));

    if (variant === "exams") {
      fetchExams();
      fetchChapters();
    } else {
      fetchChapters();
    }
  }, []);

  const handleTileClick = (course) => {
    if (selectedCourseId === course.id) {
      setSelectedCourseId(null);
    } else {
      setSelectedCourseId(course.id);
    }
  };

  return (
    <div className="chapters">
      <h1>{courseName}</h1>
      {variant === "exams" && (
        <Link
          to={`/exams/${courseId}/generate`}
          state={{
            chapters: courses,
          }}
        >
          <button
            className="btn exam-gen"
            onClick={(event) => handleQuizButtonClick(event, concept)}
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
        </Link>
      )}

      <div className="chapters-list">
       

        {(variant === "exams" ? exams : courses)?.map((course) => (
          <Link
            to={`${
              variant === "exams"
                ? `/exams/${courseId}/${course.id}`
                : `/courses/${courseId}/${course.id}`
            }`}
            state={
              variant === "exams"
                ? {
                    questions: course.questions,
                    examTitle: course.title,
                  }
                : {}
            }
            key={course.id}
          >
            <div
              className={`chapter-tile`}
              key={course.id}
              onClick={() => handleTileClick(course)}
            >
              
              <div className="row" style={{background: course.passed ? "#0D2626" : ""}}>
                <div
                  className="chapter-number"
                  style={{background: course.passed ? "#009966" : "#203246"}}
                >
                  <p>{course.order}</p>
                </div>
                <div className="chapter-name">
                  <p>{course.title}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="resource-viewer"></div>
    </div>
  );
}
