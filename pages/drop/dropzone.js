import React, { useCallback, useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

import Dropzone from "../../components/Dropzone";
import styles from "../../styles/Dropzone.module.css";

function App() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [files_names, setFilesNames] = useState([]);
  const { drop } = router.query;

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, acceptedFiles]);
    setFilesNames([...files_names, acceptedFiles[0].name]);

    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  });

  const onSubmit = async () => {
    const config = {
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/uploads", files, config);
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
        {files_names.map((name) => {
          return (
            <p key={name} className={styles.files_names}>
              {name}
            </p>
          );
        })}
      </div>
      <Button onClick={onSubmit} className={styles.SubmitButton}>
        Upload
      </Button>
    </main>
  );
}

export default App;
