import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/Dropzone.module.css";

const Dropzone = ({ onDrop, accept }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div className={styles.dropzone_input} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <h1 className="dropzone-content">Release to drop the files here</h1>
        ) : (
          <h1 className="dropzone-content">Drag your files here.</h1>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
