import styles from "../page.module.css";
import logo from "../../../public/images/logo.gif";
import Image from "next/image";

export default function Introduction() {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.titleRegion}>
        <Image
          src={logo}
          className={styles.logo}
          width={100}
          height={100}
          alt="logo"
        />
        <div className={styles.helloRegion}>
          <h1 className={styles.helloTitle}>What Book Are You Looking For</h1>
        </div>
        <div className={styles.helpTextRegion}>
          <p>Not sure what to read next? I'm here to help you.</p>
        </div>
      </div>
    </div>
  );
}
