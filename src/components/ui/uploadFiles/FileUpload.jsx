import React, { useState } from "react";

import uploadIcon from "../../../assets/icons/upload_also.svg";
import "./style.css";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }
  };

  return (
    <div className="fileUpload">
      <img src={uploadIcon} alt="" />
      <p>Drag and Drop files to upload</p>
      <button onClick={() => {}}>
        Browse Files
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileChange}
        ></input>
      </button>
    </div>
  );
};

export default FileUpload;
