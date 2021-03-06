import styles from "../../../styles/browse/cards.module.css";
import placeholder from "../../../public/images/browse/placeholderCard.png";

import { useState, useEffect } from "react";
import ImageRender from "../../ImageRender";

export default function Cards() {
  const [itemsInRow, setItemsInRow] = useState(5); // number of items in the slider content changed dynamically on window size

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    if (window.innerWidth > 1400) {
      setItemsInRow(6);
    } else if (window.innerWidth >= 1000) {
      setItemsInRow(5);
    } else if (window.innerWidth > 700) {
      setItemsInRow(4);
    } else if (window.innerWidth > 500) {
      setItemsInRow(3);
    } else if (window.innerWidth < 500) {
      setItemsInRow(2);
    }
  };

  const renderSliderContent = () => {
    let sliderContents = [];
    let animationTime = 0;
    // adds empty divs to take up appropriate spacing when slider at initial position
    for (let i = 0; i < itemsInRow; i++) {
      sliderContents.push(
        <div
          className={styles.sliderItemPlaceholder}
          style={{
            width: `${100 / itemsInRow}%`,
            animationDelay: `${animationTime}s`,
          }}
          key={i}
        >
          <ImageRender
            src={placeholder}
            width="341"
            height="192"
            className={`${styles.pictureCardPlaceholder}`}
            alt="Movie thumbnails"
          />
        </div>
      );
      animationTime += 0.2;
    }

    return sliderContents;
  };

  return (
    <section className={styles.rowOfCards}>
      <div className={styles.cardsHeadings}>
        <h1 className={styles.cardH1} style={{ opacity: 0 }}>
          a
        </h1>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.cards}>
          <div className={styles.sliderContainer}>
            <div className={`${styles.slider}`}>{renderSliderContent()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
