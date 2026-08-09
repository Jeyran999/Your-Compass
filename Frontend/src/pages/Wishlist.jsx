import { useWishlist } from "../context/WishlistContext";
import TourCard from "../components/cards/Tour";
import styles from "./Wishlist.module.scss";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>My Wishlist</h2>
        <p className={styles.empty}>Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Wishlist</h2>
      <div className={styles.grid}>
        {wishlist.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;