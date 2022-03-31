import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Dropzone.module.css";

export default function UploadMessage() {
  const router = useRouter();
  const { drop, upload } = router.query;
  const returnPage = "/drop/" + drop;

  return (
    <main className={styles.app}>
      <h2 className={styles.h2}>Thanks !</h2>
      <h2 className={styles.successful}>
        The files below have been successfully uploaded :
      </h2>
      <h1 className={styles.uploaded_files}>{upload}</h1>
      <Link href={returnPage}>
        <a className={styles.upload_more}>Upload More</a>
      </Link>
    </main>
  );
}
