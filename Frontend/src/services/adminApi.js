import api from "./api";

const getToken = () => localStorage.getItem("token");

export const adminApi = {
  getAllTours: () => api.get("/tours?limit=100"),
  createTour: (data) =>
    api.post("/tours", data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  updateTour: (id, data) =>
    api.put(`/tours/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  deleteTour: (id) =>
    api.delete(`/tours/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  getAllOrders: () =>
    api.get("/orders", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  updateOrderStatus: (id, status) =>
    api.put(
      `/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${getToken()}` } },
    ),
};
