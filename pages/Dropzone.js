import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
// Import the dropzone component
import Dropzone from "../components/Dropzone";
import styles from "../styles/Dropzone.module.css";

function App() {
  const [files, setFiles] = useState([]);
  const [files_names, setFilesNames] = useState([]);

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, acceptedFiles]);
    setFilesNames([...files_names, acceptedFiles[0].name]);
    console.log(files_names);
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  });

  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  return (
    <main className={styles.app}>
      <Dropzone onDrop={onDrop} />
      <div className={styles.uploadingfiles}>
        {files_names.map((name) => {
          return (
            <p key={name} className={styles.files_names}>
              {name}
            </p>
          );
        })}
      </div>
      <Button className={styles.SubmitButton}>Upload</Button>
    </main>
  );
}

export default App;
