import React, { useState, useEffect } from "react";
import { getUploadedFiles, uploadFile } from "../apis/FilesApis";
import { FaUpload ,FaGripVertical } from "react-icons/fa";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tag, setTag] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);

  useEffect(() => {
    getUploadedFiles().then(setFiles);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !tag) {
      alert("Please select a file and add a tag!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("tags", tag);

    const response = await uploadFile(formData);
    if (response.status && response.status === 1) {
      setFiles((prev) => [
        ...prev,
        {
          _id: response.file._id,
          filename: response.file.filename,
          fileType: response.file.fileType,
          tags: response.file.tags,
          fileUrl: response.file.fileUrl,
        },
      ]);
      setSelectedFile(null);
      setTag("");
      setIsPopupOpen(false);
    }
    else{
      window.location.href = '/login';

    }
  };

  const handleRowDragStart = (index) => {
    setDraggedRowIndex(index);
  };

  const handleRowDragOver = (event, index) => {
    event.preventDefault();
    if (draggedRowIndex === index) return;
  };

  const handleRowDrop = (event, index) => {
    const reorderedFiles = [...files];
    const [removedRow] = reorderedFiles.splice(draggedRowIndex, 1);
    reorderedFiles.splice(index, 0, removedRow);
    setFiles(reorderedFiles);
    setDraggedRowIndex(null);
  };

  return (
    <div className="container">
      <h1>Files List</h1>
      <button onClick={() => setIsPopupOpen(true)} className="upload-btn">
        <FaUpload /> Upload File
      </button>

      <div
        className={`overlay ${isPopupOpen ? "active" : ""}`}
        onClick={() => setIsPopupOpen(false)}
      ></div>
      <div className={`popup ${isPopupOpen ? "active" : ""}`}>
        <h2>Upload File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*, video/*"
        />
        <input
          type="text"
          placeholder="Enter tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>File Name</th>
            <th>Type</th>
            <th>Tag</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 && <p>There is no data</p>}
          {files.map((file, index) => (
            <tr
              key={file._id}
              draggable
              onDragStart={() => handleRowDragStart(index)}
              onDragOver={(event) => handleRowDragOver(event, index)}
              onDrop={(event) => handleRowDrop(event, index)}
            >
              <td>
              <FaGripVertical
                  style={{
                    cursor: "grab",
                    marginRight: "10px",
                    fontSize: "18px",
                  }}
                />
              </td>
              <td>{file.filename}</td>
              <td>{file.fileType}</td>
              <td>{file.tags.join(",")}</td>
              <td>{file.views||0}</td>

              <td>
                <div className="action-buttons">
                  <button
                    className="share"
                    onClick={() => window.open(file.fileUrl, "_blank")}
                  >
                    Share
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadPage;
