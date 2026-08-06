import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import styles from "./TourDetail.module.scss";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <img src={tour.images[0]} alt={tour.cityName} className={styles.image} />

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
        <button className={styles.bookButton}>Book Now</button>
        <button className={styles.wishlistButton}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default TourDetail;