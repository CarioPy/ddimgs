import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Dropzone.module.css";

export default function UploadMessage() {
  const router = useRouter();
  const { drop, upload } = router.query;
  const returnPage = "/drop/" + drop;

  return (
    <main className={styles.app}>
      <h2 className={styles.h2}>Thanks {drop} !</h2>
      <h2 className={styles.successful}>
        Your file have been successfully uploaded and is available at :
      </h2>
      <Link
        href={`https://test-space-swift.fra1.digitaloceanspaces.com/${upload}`}
      >
        <h1 className={styles.link_uploaded_files}>
          https://test-space-swift.fra1.digitaloceanspaces.com/{upload}
        </h1>
      </Link>
      <Link href={returnPage}>
        <a className={styles.upload_more}>Upload More</a>
      </Link>
    </main>
  );
}
