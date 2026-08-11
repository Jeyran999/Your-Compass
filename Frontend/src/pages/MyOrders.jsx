import { useOrders } from "../context/OrderContext";
import styles from "./MyOrders.module.scss";

const MyOrders = () => {
  const { orders, cancelOrder } = useOrders();

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
            {order.status === "confirmed" && (
              <button
                className={styles.cancelButton}
                onClick={() => cancelOrder(order._id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
