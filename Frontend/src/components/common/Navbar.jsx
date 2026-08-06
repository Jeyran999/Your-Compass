import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

        {user ? (
          <>
            <span className={styles.link}>Hi, {user.username}</span>
            <button onClick={handleLogout} className={styles.link}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
