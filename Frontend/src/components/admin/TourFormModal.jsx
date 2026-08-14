import { useEffect, useState } from "react";
import { adminApi } from "../../services/adminApi";
import styles from "./TourFormModal.module.scss";

const emptyForm = {
  cityName: "",
  packageTitle: "",
  description: "",
  images: "",
  price: "",
  duration: "",
  climate: "hot",
  foodType: "spicy",
  activityType: "beach",
  cityVibe: "historic",
  budget: "cheap",
};

const TourFormModal = ({ tour, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(tour);

  useEffect(() => {
    if (tour) {
      setFormData({
        ...tour,
        images: tour.images.join(", "),
      });
    }
  }, [tour]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
      images: formData.images.split(",").map((url) => url.trim()),
    };

    try {
      if (isEditing) {
        await adminApi.updateTour(tour._id, payload);
      } else {
        await adminApi.createTour(payload);
      }
      onSuccess();
      onClose();
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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Edit Tour" : "Add New Tour"}</h2>

        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>City Name</label>
            <input
              name="cityName"
              placeholder="e.g. Baku"
              value={formData.cityName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Package Title</label>
            <input
              name="packageTitle"
              placeholder="e.g. 3-Day Cultural Discovery"
              value={formData.packageTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the tour..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Image URLs (comma separated)</label>
            <input
              name="images"
              placeholder="https://..., https://..."
              value={formData.images}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="350"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Duration (days)</label>
              <input
                type="number"
                name="duration"
                placeholder="5"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Climate</label>
              <select name="climate" value={formData.climate} onChange={handleChange}>
                <option value="hot">Hot</option>
                <option value="cold">Cold</option>
                <option value="moderate">Moderate</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Budget</label>
              <select name="budget" value={formData.budget} onChange={handleChange}>
                <option value="cheap">Cheap</option>
                <option value="moderate">Moderate</option>
                <option value="expensive">Expensive</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Food Type</label>
              <select name="foodType" value={formData.foodType} onChange={handleChange}>
                <option value="spicy">Spicy</option>
                <option value="mild">Mild</option>
                <option value="seafood">Seafood</option>
                <option value="vegetarian-friendly">Vegetarian</option>
                <option value="diverse">Diverse</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Activity Type</label>
              <select name="activityType" value={formData.activityType} onChange={handleChange}>
                <option value="beach">Beach</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="relaxation">Relaxation</option>
                <option value="nature">Nature</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>City Vibe</label>
            <select name="cityVibe" value={formData.cityVibe} onChange={handleChange}>
              <option value="historic">Historic</option>
              <option value="modern">Modern</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourFormModal;
