import styles from "../../styles/Home/cardOne.module.css";
import baseStyles from "../../styles/Home/card.module.css";
import tvImg from "../../public/images/home/tv.png";

import Image from "next/image";

export default function CardOne() {
  return (
    <div className={baseStyles.container}>
      <div className={styles.containerCard}>
        <div className={`${baseStyles.wordGroup} ${styles.wordGroup}`}>
          <div className={styles.wordGroupContain}>
            <h1 className={styles.wordGroupBig}>Enjoy on your TV.</h1>
            <p className={styles.wordGroupSml}>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
        </div>
        <div className={styles.imgPresent}>
          <div className={styles.vidPresentContainer}>
            <video
              className={styles.videoTv}
              autoPlay={true}
              loop={true}
              src="/videos/netflix-video.m4v"
            ></video>
            <div className={styles.imgPresentContainer}>
              <Image
                src={tvImg}
                alt="a tv displaying netflix user interface"
                className={styles.tvImg}
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
