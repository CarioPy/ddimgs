import React, { useState, useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import uploadObject from "../api/uploads/upload_DO";

import Dropzone from "../../components/Dropzone";
import styles from "../../styles/Dropzone.module.css";

function App() {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  // You don't need to create state for the file_names, because the file names can be derived from the "files" state.
  const { drop } = router.query;

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    // If the new state is computed using the previous state, you can pass a function to the setFiles function.
    // This function will receive the current state, and it must return a new state.
    // Read more here https://reactjs.org/docs/hooks-reference.html#functional-updates
    setFiles((current) => {
      // Your mistake before was writing
      // [...current, acceptedFiles]
      // The problem is, acceptedFiles is an array. If you want to append the elements of an array
      // to another array, you need to spread both the target array and the new array.
      return [...current, ...acceptedFiles];
    });
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  }, []);

  const onSubmit = async () => {
    const config = {
      // when uploading files, the content type needs to be multipart/form-data
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    // Create a FormData which contains the files to upload.
    // Read more about FormData here https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("theFiles", file);
      console.log(file.name);
    });

    const response = await axios.post("/api/uploads", formData, config);
    console.log("response", response.data);
  };

  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  return (
    <main className={styles.app}>
      <div className={styles.top_header}>
        <div className={styles.hello_header}>
          <h3>Hello</h3>
        </div>
        <div className={styles.email_header}>
          <h3>{drop}</h3>
        </div>
        <div className={styles.exit_header}>
          <Link href="/">
            <h3>Log Out</h3>
          </Link>
        </div>
      </div>
      <Dropzone onDrop={onDrop} />
      <div className={styles.uploadingfiles}>
        {/* Render the file names from the "files" state */}
        {files.map(({ name }) => {
          return (
            <p key={name} className={styles.files_names}>
              {name}
            </p>
          );
        })}
      </div>
      <Button onClick={uploadObject} className={styles.SubmitButton}>
        Upload
      </Button>
    </main>
  );
}

export default App;
