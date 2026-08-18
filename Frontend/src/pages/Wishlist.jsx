import WishlistCard from "../components/cards/WishlistCard"; // dəyişdi
import { useWishlist } from "../context/WishlistContext";
import styles from "./Wishlist.module.scss";

const Wishlist = () => {
  // Data already lives in context - no fetch needed here
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
        {wishlist.map((tour) => <WishlistCard key={tour._id} tour={tour} />)}
      </div>
    </div>
  );
};

export default Wishlist;
