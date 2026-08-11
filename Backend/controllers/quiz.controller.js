const Tour = require("../models/tours.model");

const quizController = {
  getRecommendations: async (req, res) => {
    try {
      const { climate, foodType, activityType, cityVibe, budget } = req.body;
      const tours = await Tour.find(); // all tours
      const scoredTours = tours.map((tour) => {
        let score = 0;

        if (tour.climate === climate) score++;
        if (tour.foodType === foodType) score++;
        if (tour.activityType === activityType) score++;
        if (tour.cityVibe === cityVibe) score++;
        if (tour.budget === budget) score++;

        return { tour, score };
      });
      const maxScore = Math.max(...scoredTours.map((item) => item.score));
      let topMatches = scoredTours
        .filter((item) => item.score === maxScore)
        .slice(0, 4); // show max 4 tours 

      if (maxScore === 0) {
        return res.status(200).json({
          message: "No perfect matches found, here are some popular tours",
          recommendations: tours.slice(0, 5),
        });
      }
      res.status(200).json({
        message: "Here are your recommended tours",
        recommendations: topMatches,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export
module.exports = quizController;
