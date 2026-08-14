import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import TourFormModal from "../../components/admin/TourFormModal";
import { adminApi } from "../../services/adminApi";
import styles from "./ManageTours.module.scss";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  const fetchTours = async () => {
    try {
      const response = await adminApi.getAllTours();
      setTours(response.data.tours);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (tourId) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    try {
      await adminApi.deleteTour(tourId);
      fetchTours();
    } catch (err) {
      console.log(err);
    }
  };

  const openAddModal = () => {
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Tours</h1>
        <button className={styles.addButton} onClick={openAddModal}>
          + Add New Tour
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>City</th>
            <th>Package</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.cityName}</td>
              <td>{tour.packageTitle}</td>
              <td>${tour.price}</td>
              <td>{tour.duration} days</td>
              <td>
                <button className={styles.editBtn} onClick={() => openEditModal(tour)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(tour._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <TourFormModal
          tour={editingTour}
          onClose={closeModal}
          onSuccess={fetchTours}
        />
      )}
    </AdminLayout>
  );
};

export default ManageTours;
