import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`${styles.layout} ${!isSidebarOpen ? styles.collapsed : ""}`}>
      <AdminSidebar isOpen={isSidebarOpen} />
      <div className={styles.content}>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "☰ Hide Menu" : "☰ Show Menu"}
        </button>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;