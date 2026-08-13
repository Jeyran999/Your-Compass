import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import styles from "../src/App.module.scss"

function App() {
  return (
    <div className={styles.appWrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
