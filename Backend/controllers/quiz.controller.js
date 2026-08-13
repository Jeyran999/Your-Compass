const Tour = require("../models/tours.model");

const quizController = {
  getRecommendations: async (req, res) => {
    try {
      const { climate, foodType, activityType, cityVibe, budget } = req.body;

      const criteria = { climate, foodType, activityType, cityVibe, budget };
      const activeCriteria = Object.entries(criteria).filter(
        ([, value]) => value && value !== "any",
      );

      const tours = await Tour.find();

      const scoredTours = tours.map((tour) => {
        let score = 0;
        activeCriteria.forEach(([key, value]) => {
          if (tour[key] === value) score++;
        });
        return { tour, score };
      });

      const maxScore = Math.max(...scoredTours.map((item) => item.score));

      let topMatches = scoredTours
        .filter((item) => item.score === maxScore)
        .slice(0, 4);

      if (maxScore === 0) {
        return res.status(200).json({
          message: "No matches found, here are some popular tours",
          recommendations: tours.slice(0, 4).map((tour) => ({ tour, score: 0 })),
        });
      }

      res.status(200).json({
        message: `Here are your top matches (${maxScore}/${activeCriteria.length} criteria matched)`,
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
