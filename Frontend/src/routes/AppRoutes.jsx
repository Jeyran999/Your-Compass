import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageTours from "../pages/admin/ManageTours";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import TourDetail from "../pages/TourDetail";
import Wishlist from "../pages/Wishlist";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours/:id" element={<TourDetail />} />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/:id"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/quiz" element={<Quiz />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/tours"
        element={
          <AdminRoute>
            <ManageTours />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
