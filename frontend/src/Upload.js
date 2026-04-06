
import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:3000/upload", formData);

    alert("Uploaded successfully");
  };

  return (
    <div>
      <h3>Upload Document</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
