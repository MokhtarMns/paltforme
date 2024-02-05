import React, { useState } from "react";

import "./style.css";
import FileUpload from "../../components/ui/uploadFiles/FileUpload";

const AddResources = () => {
  const modules = ["Module A", "Module B", "Module C"];
  const chapters = ["Chapter 1", "Chapter 2", "Chapter 3"];

  const [selectedModule, setSelectedModule] = useState("");
  const [isNewChapter, setIsNewChapter] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  const handleNewChapterToggle = () => {
    setIsNewChapter(!isNewChapter);
    setSelectedChapter("");
  };

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Module:", selectedModule);
    console.log("Is New Chapter:", isNewChapter);
    console.log("Selected Chapter:", selectedChapter);
    console.log("Task Title:", taskTitle);
  };

  return (
    <div className="addResources">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="module">Select Module:</label>
          <select
            id="module"
            required
            value={selectedModule}
            onChange={handleModuleChange}
          >
            <option value="">-- Select Module --</option>
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chapter:</label>
          <div>
            <input
              type="checkbox"
              name="chapterType"
              checked={!isNewChapter}
              onChange={handleNewChapterToggle}
            />
            <label htmlFor="chapterTitle">Chapter Title:</label>
            {!isNewChapter ? (
              <select
                value={selectedChapter}
                onChange={handleChapterChange}
                disabled={isNewChapter}
              >
                <option value="">-- Select Chapter --</option>
                {chapters.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="chapterTitle"
                value={taskTitle}
                onChange={handleTaskTitleChange}
              />
            )}
          </div>

          <div>
            <label>New Chapter</label>
          </div>
        </div>

        <div>
          <label htmlFor="taskTitle">Task Title:</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={handleTaskTitleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <FileUpload></FileUpload>
    </div>
  );
};

export default AddResources;
