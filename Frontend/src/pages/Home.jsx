import { useState, useEffect } from "react";
import api from "../services/api";
import TourCard from "../components/cards/Tour";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get("/tours");
        setTours(response.data.tours);
      } catch (err) {
        console.log(err);
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "40px" }}>
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default Home;