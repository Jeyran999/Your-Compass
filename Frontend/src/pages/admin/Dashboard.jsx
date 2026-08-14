import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalTours: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toursRes, ordersRes] = await Promise.all([
          api.get("/tours?limit=1"),
          api.get("/orders", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        setStats({
          totalTours: toursRes.data.totalTours,
          totalOrders: ordersRes.data.totalOrders,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className={styles.title}>Dashboard</h1>

      {loading ? <p>Loading stats...</p> : (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Tours</p>
            <p className={styles.statValue}>{stats.totalTours}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Orders</p>
            <p className={styles.statValue}>{stats.totalOrders}</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
