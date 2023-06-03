const Rating = require('../model/ratingsModel');
const Property = require('../model/propertySchema')

// Add a rating to a property
const addRatingToProperty = async (req, res) => {
  try {
    const { propertyId, rating } = req.body;

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newRating = new Rating({
      property: propertyId,
      rating,
      user: req.user.id // Assuming you have authentication and the current user is available in req.user
    });

    const savedRating = await newRating.save();
    res.status(201).json({ rating: savedRating, message: 'Rating added to property successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get ratings for a property
const getPropertyRatings = async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const ratings = await Rating.find({ property: propertyId });
    res.status(200).json({ ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addRatingToProperty,
  getPropertyRatings
}