import { Link, useLocation } from "react-router-dom";
import styles from "./AdminSidebar.module.scss";

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const links = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/tours", label: "Manage Tours" },
    { to: "/admin/orders", label: "Manage Orders" },
  ];

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ""}`}>
      {isOpen && (
        <>
          <h2 className={styles.title}>Admin Panel</h2>
          <nav>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.link} ${location.pathname === link.to ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className={styles.backLink}>
            ← Back to site
          </Link>
        </>
      )}
    </aside>
  );
};

export default AdminSidebar;
