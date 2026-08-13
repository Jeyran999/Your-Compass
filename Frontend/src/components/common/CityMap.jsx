import styles from "./CityMap.module.scss";

const CityMap = ({ cityName }) => {
  const query = encodeURIComponent(cityName);

  return (
    <div className={styles.mapContainer}>
      <iframe
        title="City location"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default CityMap;