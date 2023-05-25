const Review = require('../model/reviewShema');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { title, description, rating } = req.body;

    const review = new Review({
      title,
      description,
      rating,
      user: req.user._id // Assuming you have authentication and the current user is available in req.user
    });

    const savedReview = await review.save();
    res.status(201).json({ review: savedReview, message: 'Review created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing review
const updateReview = async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    const reviewId = req.params.id;

    const review = await Review.findByIdAndUpdate(reviewId, {
      title,
      description,
      rating
    }, { new: true });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ review, message: 'Review updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate({
        path:'user',
        select: 'name , email'
    });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single review by ID
const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById,
};
