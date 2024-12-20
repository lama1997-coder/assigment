import React, { useState, useEffect } from "react";
import { getUploadedFiles, uploadFile } from "../apis/FilesApis";
import { FaUpload } from "react-icons/fa";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tag, setTag] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching files from API
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
    if (response.status===1) {
      setFiles((prev) => [
        ...prev,
        {
          _id: response.file._id,
          filename: response.file.filename,
          fileType: response.file.fileType,
          tags:response.file.tags,
          fileUrl:response.file.fileUrl,
          // date: new Date().toLocaleDateString(),
        },
      ]);
      setSelectedFile(null);
      setTag("");
      setIsPopupOpen(false);
    }
  };

  const handleDelete = (id) => {
    // Simulate deletion (you would call an API here)
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleShare = (id) => {
    alert(`Sharing file with ID: ${id}`);
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
        <input type="file" onChange={handleFileChange}    accept="image/*, video/*" 
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
            <th>File Name</th>
            <th>Type</th>
            <th>Tag</th>
            {/* <th>Uploaded Date</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length==0&&<p>There is no data</p>}
          {files.map((file) => (
            <tr key={file._id}>
              <td>{file.filename}</td>
              <td>{file.fileType}</td>
              <td>{file.tags.join(',')}</td>
              {/* <td>{file.date}</td> */}
              <td>
                <div className="action-buttons">
                  <button
                    className="share"
                    onClick={() => window.open(file.fileUrl, "_blank")}
                  >
                    Share
                  </button>
                  {/* <button
                    className="delete"
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button> */}
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
