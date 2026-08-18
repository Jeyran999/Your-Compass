import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import styles from "./Checkout.module.scss";

const Checkout = () => {
  const { id } = useParams(); // tour being booked
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    travelers: 1,
    travelDate: "",
    cardNumber: "",
    cardExpires: "",
    cardCVV: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      const response = await api.get(`/tours/${id}`);
      setTour(response.data.tour);
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      // Card details are sent for validation only -- the backend only stores the last 4 digits
      await api.post(
        "/orders",
        { ...formData, tourId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setSuccess(true);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors([err.response?.data?.message || "Something went wrong"]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h2>Booking Confirmed!</h2>
          <p>Your trip to {tour?.cityName} has been booked successfully.</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  if (!tour) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <h3>
          {tour.cityName} — {tour.packageTitle}
        </h3>
        <p>${tour.price} per person</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}

        <label>Number of travelers</label>
        <input
          type="number"
          name="travelers"
          min="1"
          value={formData.travelers}
          onChange={handleChange}
          required
        />

        <label>Travel date</label>
        <input
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          required
        />

        <label>Card number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234123412341234"
          maxLength="16"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />

        <div className={styles.row}>
          <div>
            <label>Expiry (MM/YY)</label>
            <input
              type="text"
              name="cardExpires"
              placeholder="12/28"
              value={formData.cardExpires}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cardCVV"
              placeholder="123"
              maxLength="3"
              value={formData.cardCVV}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Total updates live as the traveler count changes */}
        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : `Pay $${tour.price * formData.travelers}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
