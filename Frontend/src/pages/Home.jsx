import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import TourCard from "../components/cards/Tour";
import styles from "./Home.module.scss";

const Home = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [tours, setTours] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get(
          `/tours?page=${page}&limit=12&sortBy=${sortBy}&order=${order}&search=${search}`,
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
  }, [page, sortBy, order, search]);

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(1);
  };

  if (initialLoad) return <p>Loading tours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {search && (
        <p className={styles.searchInfo}>
          Showing results for: <strong>{search}</strong>
        </p>
      )}

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

      {tours.length === 0 ? (
        <p className={styles.empty}>No tours found.</p>
      ) : (
        <>
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
        </>
      )}

      
    </div>
  );
};

export default Home;
