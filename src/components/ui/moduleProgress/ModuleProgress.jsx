import React, { useEffect } from "react";
import "./style.css";

const ModuleProgress = ({ modules, setTotalProgress }) => {
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

  useEffect(() => {
    // Calculate total progress
    const totalPassedChapters = modules.reduce(
      (acc, module) =>
        acc + module.chapters.filter((chapter) => chapter.passed).length,
      0
    );
    const totalChapters = modules.reduce(
      (acc, module) => acc + module.chapters.length,
      0
    );
    const totalProgress =
      totalChapters > 0 ? (totalPassedChapters / totalChapters) * 100 : 0;

    // Set total progress
    setTotalProgress(totalProgress);
  }, [modules, setTotalProgress]);

  return (
    <div className="progress-card">
      {modules.map((module, index) => (
        <div key={module.id} className="module-progress">
          <p>{module.label}</p>

          <div className="progress-bar-dash">
            <div
              className="bar"
              style={{
                width: `${
                  (module.chapters.filter((chapter) => chapter.passed).length /
                    module.chapters.length) *
                  100
                }%`,
                backgroundColor: pastelColors[index],
              }}
              title={`
                ${module.chapters.filter((chapter) => chapter.passed).length} ${
                module.chapters.filter((chapter) => chapter.passed).length <= 1
                  ? "chapter"
                  : "chapters"
              } from ${module.chapters.length} ${
                module.chapters.length <= 1
                  ? "chapter"
                  : "chapters"
              }
              `}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleProgress;
