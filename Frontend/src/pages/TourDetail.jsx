import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CityMap from "../components/common/CityMap";
import ImageSlider from "../components/common/ImageSlider";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../services/api";
import styles from "./TourDetail.module.scss";

const TourDetail = () => {
  const { id } = useParams(); // tour ID from the URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const navigate = useNavigate();

  // Refetch if the ID in the URL changes (e.g. navigating between tours)
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await api.get(`/tours/${id}`);
        setTour(response.data.tour);
      } catch (err) {
        console.log(err);
        setError("Tour not found");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tour) return null;

  return (
    <div className={styles.container}>
      <ImageSlider images={tour.images} alt={tour.cityName} />
      <CityMap cityName={tour.cityName} />

      <div className={styles.header}>
        <div>
          <h1 className={styles.cityName}>{tour.cityName}</h1>
          <p className={styles.packageTitle}>{tour.packageTitle}</p>
        </div>
        <span className={styles.price}>${tour.price}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.badge}>{tour.duration} days</span>
        <span className={styles.badge}>{tour.climate}</span>
        <span className={styles.badge}>{tour.activityType}</span>
        <span className={styles.badge}>{tour.cityVibe}</span>
        <span className={styles.badge}>{tour.budget}</span>
      </div>

      <p className={styles.description}>{tour.description}</p>

      <div className={styles.actions}>
        <button
          className={styles.bookButton}
          onClick={() => navigate(`/checkout/${tour._id}`)}
        >
          Book Now
        </button>

        {/* Wishlist button only shown to logged-in users */}
        {user
          && (isInWishlist(tour._id)
            ? (
              <button
                className={styles.wishlistButton}
                onClick={() => removeFromWishlist(tour._id)}
              >
                Remove from Wishlist
              </button>
            )
            : (
              <button
                className={styles.wishlistButton}
                onClick={() => addToWishlist(tour._id)}
              >
                Add to Wishlist
              </button>
            ))}
      </div>
    </div>
  );
};

export default TourDetail;
