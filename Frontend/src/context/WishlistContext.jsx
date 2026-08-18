import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // Fetches the current wishlist from the backend (populated with full tour data)
  const fetchWishlist = async () => {
    try {
      const response = await api.get("/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlist(response.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  // Re-fetch whenever the logged-in user changes (login/logout),
  // and clear the wishlist on logout so stale data isn't shown.
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const addToWishlist = async (tourId) => {
    try {
      await api.post(
        "/wishlist",
        { tourId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchWishlist(); // refresh so all components see the update
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (tourId) => {
    try {
      await api.delete(`/wishlist/${tourId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  // Helper function by TourDetail to decide whether to show "Add to Wishlist" or "Remove from Wishlist".
  const isInWishlist = (tourId) => {
    return wishlist.some((tour) => tour._id === tourId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
