import { useState } from "react";
import TourCard from "../components/cards/Tour";
import api from "../services/api";
import styles from "./Quiz.module.scss";

const questions = [
  {
    key: "climate",
    label: "What climate do you prefer?",
    options: [
      { value: "hot", label: "Hot" },
      { value: "cold", label: "Cold" },
      { value: "moderate", label: "Moderate" },
    ],
  },
  {
    key: "foodType",
    label: "What kind of food do you enjoy?",
    options: [
      { value: "spicy", label: "Spicy" },
      { value: "seafood", label: "Seafood" },
      { value: "vegetarian-friendly", label: "Vegetarian" },
    ],
  },
  {
    key: "activityType",
    label: "What activity excites you most?",
    options: [
      { value: "beach", label: "Beach" },
      { value: "adventure", label: "Adventure" },
      { value: "cultural", label: "Cultural" },
    ],
  },
  {
    key: "cityVibe",
    label: "Historic or modern city vibe?",
    options: [
      { value: "historic", label: "Historic" },
      { value: "modern", label: "Modern" },
      { value: "any", label: "No preference" },
    ],
  },
  {
    key: "budget",
    label: "What's your budget?",
    options: [
      { value: "cheap", label: "Cheap" },
      { value: "moderate", label: "Moderate" },
      { value: "expensive", label: "Expensive" },
    ],
  },
];

const Quiz = () => {
  const [step, setStep] = useState(0); // index of the current question
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  const handleSelect = (value) => {
    const updatedAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(updatedAnswers);

    if (isLastStep) {
      submitQuiz(updatedAnswers); // pass directly -- state update isn't synchronous yet
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    try {
      const response = await api.post("/quiz", finalAnswers);
      setResults(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.matchInfo}>Finding your matches...</p>
      </div>
    );
  }

  if (results) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Your Matches</h2>
        <p className={styles.matchInfo}>{results.message}</p>

        <div className={styles.resultsGrid}>
          {results.recommendations.map((item) => <TourCard key={item.tour._id} tour={item.tour} />)}
        </div>

        <button className={styles.retakeButton} onClick={handleRetake}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.progress}>
        Question {step + 1} of {questions.length}
      </p>

      <div className={styles.question}>
        <h3>{currentQuestion.label}</h3>
        <div className={styles.options}>
          {currentQuestion.options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.option} ${
                answers[currentQuestion.key] === opt.value
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
      )}
    </div>
  );
};

export default Quiz;
