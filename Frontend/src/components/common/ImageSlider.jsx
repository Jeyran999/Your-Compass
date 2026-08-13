import { useState } from "react";
import styles from "./ImageSlider.module.scss";

const ImageSlider = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const goPrev = () => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const goNext = () => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  return (
    <div className={styles.slider}>
      <img src={images[current]} alt={alt} className={styles.image} />

      {images.length > 1 && (
        <>
          <button className={styles.prevBtn} onClick={goPrev}>
            ‹
          </button>
          <button className={styles.nextBtn} onClick={goNext}>
            ›
          </button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
