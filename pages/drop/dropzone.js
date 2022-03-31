import React, { useCallback, useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import Dropzone from "../../components/Dropzone";
import styles from "../../styles/Dropzone.module.css";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [files_names, setFilesNames] = useState([]);
  const { drop } = router.query;

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, acceptedFiles]);
    setFilesNames([...files_names, acceptedFiles[0].name]);
    console.log(files);
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  });

  const onSubmit = async () => {
    let urls = files_names.toString();
    let url = drop + "/" + urls;

    try {
      const res = await fetch("http://localhost:3000/api/uploads", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: url }),
      });
      router.push(url);
    } catch (error) {
      console.log(error);
    }
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
          <h3 href="localhost:3000">Exit</h3>
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
