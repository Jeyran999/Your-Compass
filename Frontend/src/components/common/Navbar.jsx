import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { orders } = useOrders();
  const activeOrders = orders.filter((order) => order.status === "confirmed");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          Your Compass
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`${styles.collapsible} ${isMenuOpen ? styles.open : ""}`}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <div className={styles.links}>
          <Link to="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/quiz" className={styles.link} onClick={() => setIsMenuOpen(false)}>
            Quiz
          </Link>
          <Link to="/wishlist" className={styles.link} onClick={() => setIsMenuOpen(false)}>
            Wishlist {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
          </Link>

          {user
            ? (
              <>
                <Link to="/my-orders" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                  My Orders {activeOrders.length > 0 && <span className={styles.badge}>{activeOrders.length}</span>}
                </Link>
                <span className={styles.username}>Hi, {user.username}</span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </>
            )
            : (
              <Link to="/login" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
