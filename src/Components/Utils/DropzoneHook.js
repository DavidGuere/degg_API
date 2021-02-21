// Credits: https://github.com/react-dropzone/react-dropzone

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function DropzoneHook() {
  // Convert URI to BLOB. Credits: https://stackoverflow.com/questions/17328438/convert-data-uri-to-file
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    const formData = new FormData();
    var orientation;

    // Check image orientation and resize image canvas
    var img = new Image();
    img.src = window.URL.createObjectURL(image);
    const canvas = document.createElement("canvas");

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width > height) {
        orientation = "l";
        const maxWidth = 1400;
        const scale = maxWidth / width;

        canvas.width = maxWidth;
        canvas.height = scale * height;
      } else {
        orientation = "v";
        const maxHeight = 900;
        const scale = maxHeight / height;

        canvas.width = scale * width;
        canvas.height = maxHeight;
      }

      // Put image to canvas and convert to BLOB
      const canvasContext = canvas.getContext("2d");
      canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizeImage = canvasContext.canvas.toDataURL(img, "image/jpg");
      const imageBlob = dataURLtoBlob(resizeImage);

      formData.append("image", imageBlob); // (@RequestParam, File)

      axios
        .post(
          `http://localhost:8080/api/v1/upload/image/${orientation}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          console.log("file upload successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    };
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
