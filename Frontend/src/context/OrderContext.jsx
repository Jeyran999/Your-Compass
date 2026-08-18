import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

// Keeps the user's orders in sync across Navbar (badge count) and My Orders page, so cancelling an order updates both instantly
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  // Refetch on login, clear on logout
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const cancelOrder = async (orderId) => {
    try {
      await api.put(
        `/orders/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, cancelOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
