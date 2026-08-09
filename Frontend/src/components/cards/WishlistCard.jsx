import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./WishlistCard.module.scss";

const WishlistCard = ({ tour }) => {
  const { removeFromWishlist } = useWishlist();

  return (
    <div className={styles.card}>
      <img src={tour.images[0]} alt={tour.cityName} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{tour.cityName}</h3>
        <p className={styles.subtitle}>{tour.packageTitle}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>${tour.price}</span>
          <span className={styles.duration}>{tour.duration} days</span>
        </div>
        <div className={styles.actions}>
          <Link to={`/tours/${tour._id}`} className={styles.viewButton}>
            View Details
          </Link>
          <button
            className={styles.removeButton}
            onClick={() => removeFromWishlist(tour._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
