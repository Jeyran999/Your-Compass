import { useState, useEffect } from "react";
import api from "../services/api";
import styles from "./MyOrders.module.scss";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>My Orders</h2>
        <p className={styles.empty}>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <div className={styles.info}>
            <h3>
              {order.tourId?.cityName} — {order.tourId?.packageTitle}
            </h3>
            <p>
              {order.travelers} traveler(s) ·{" "}
              {new Date(order.travelDate).toLocaleDateString()}
            </p>
            <p>Card ending in {order.cardLast4}</p>
          </div>
          <div className={styles.right}>
            <p className={styles.price}>${order.totalPrice}</p>
            <span className={`${styles.status} ${styles[order.status]}`}>
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
