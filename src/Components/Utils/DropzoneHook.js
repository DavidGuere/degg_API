// Credits: https://github.com/react-dropzone/react-dropzone

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function DropzoneHook() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const image = acceptedFiles[0];
    const formData = new FormData();

    formData.append("image", image); // (@RequestParam, File)

    axios
      .post("http://localhost:8080/api/v1/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("file upload successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="d-flex align-items-center justify-content-center rounded"
      {...getRootProps()}
      style={{ height: "200px", backgroundColor: "lightblue" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop the pictures here, or click to select files</p>
      )}
    </div>
  );
}
