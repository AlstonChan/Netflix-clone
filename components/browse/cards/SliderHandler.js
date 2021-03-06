import styles from "../../../styles/browse/cards.module.css";
import navArrow from "../../../public/images/icons/arrow/nav_arrow.svg";

import Image from "next/image";

export default function SliderHandler({ onClick, direction }) {
  return (
    <span
      onClick={(e) => onClick(e)}
      className={`${styles.handle} ${
        direction == "lft" ? styles.handlelft : styles.handleRgt
      }`}
      data-handle={direction}
    >
      <div className={styles.navArrowContainer}>
        <Image
          layout="fill"
          src={navArrow}
          alt=""
          unoptimized
          className={styles.handlerSvg}
        />
      </div>
    </span>
  );
}
