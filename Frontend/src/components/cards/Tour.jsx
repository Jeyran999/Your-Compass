import { Link } from "react-router-dom";
import styles from "./TourCard.module.scss";

const TourCard = ({ tour }) => {
  return (
    <div className={styles.card}>
      <img src={tour.images[0]} alt={tour.cityName} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{tour.cityName}</h3>
        <p className={styles.subtitle}>{tour.packageTitle}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>${tour.price}</span>
          <span className={styles.duration}>${tour.duration} days</span>
        </div>
        <Link to={"/tours/${tour._id}"} className={styles.button}>View Details</Link>
      </div>
    </div>
  );
};

export default TourCard;
