import Image from "next/image";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain}>
          <Image
            src="/images/NetflixLogo.png"
            className={styles.netflixLogo}
            alt="Netflix logo"
            width="160px"
            height="43.6px"
            priority
          />
          <button type="submit" className={`netflixBtn ${styles.submitBtn}`}>
            Sign In
          </button>
        </div>
      </header>
    </>
  );
}