import { useState, useEffect } from "react";
import api from "../services/api";
import TourCard from "../components/cards/Tour";
import styles from "./Home.module.scss";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("price");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get(
          `/tours?page=${page}&limit=12&sortBy=${sortBy}&order=${order}`,
        );
        setTours(response.data.tours);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err);
        setError("Failed to load tours");
      } finally {
        setInitialLoad(false);
      }
    };

    fetchTours();
  }, [page, sortBy, order]);

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(1); // sıralama dəyişəndə 1-ci səhifəyə qayıt
  };

  if (initialLoad) return <p>Loading tours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <select
          value={`${sortBy}-${order}`}
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="cityName-asc">City: A to Z</option>
          <option value="cityName-desc">City: Z to A</option>
        </select>
      </div>

      <div className={styles.grid}>
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={num === page ? styles.activePage : ""}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
