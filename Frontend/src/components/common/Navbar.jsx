import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useOrders } from "../../context/OrderContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const activeOrders = orders.filter((order) => order.status === "confirmed");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Your Compass
      </Link>

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
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/quiz" className={styles.link}>
          Quiz
        </Link>
        <Link to="/wishlist" className={styles.link}>
          Wishlist{" "}
          {wishlist.length > 0 && (
            <span className={styles.badge}>{wishlist.length}</span>
          )}
        </Link>

        {user ? (
          <>
            <Link to="/my-orders" className={styles.link}>
              My Orders{" "}
              {activeOrders.length > 0 && (
                <span className={styles.badge}>{activeOrders.length}</span>
              )}
            </Link>
            <span className={styles.username}>Hi, {user.username}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
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
