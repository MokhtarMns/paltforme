import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import preview from "../../assets/images/illustration-article.svg";
import avatar from "../../assets/images/image-avatar.webp";
import oopPreview from "../../assets/images/oop.png";
import { UserContext } from "../../providers/UserProvider";

export function Courses({ forExam }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  

  const imageMap = {
    object_oriented_programming: oopPreview,
    big_data: oopPreview,
    // Map other keys to their respective images
  };
  const pastelColors = [
    "#AFC8ED",
    "#29ADB2",
    "#F7B787",
    "#88AB8E",
    "#8ADAB2",
    "#FF8F8F",
    "#61A3BA",
    "#B5CB99",
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/modules", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: uid }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const coursesData = await response.json();
        setCourses(coursesData.modules);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    setCourses(JSON.parse(localStorage.getItem('userData')).classes[0].modules);

    // fetchCourses();
  }, []);

  return (
    <div className="courses">
      <h1>{forExam ? "Exams" : "Modules"}</h1>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <Link
            to={
              forExam
                ? {
                  pathname: `/exams/${course.id}`,
                    state: { courseId: 1 },
                }
                : {
                    pathname: `/courses/${course.id}`,
                    state: { courseId: 1 },
                  }
            }
            key={course.id}
          >
            <div
              className="course-card"
              key={course.id}
              onClick={() => setSelectedCourse(course)}
            >
              <div
                className="card-preview"
                style={{ backgroundColor: pastelColors[index] }}
              >
                
              </div>
              <div className="course-name">
                <p>{course.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
