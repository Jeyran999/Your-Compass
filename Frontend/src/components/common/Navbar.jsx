import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Your Compass
      </Link>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/quiz" className={styles.link}>
          Quiz
        </Link>
        <Link to="/wishlist" className={styles.link}>
          Wishlist
        </Link>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
