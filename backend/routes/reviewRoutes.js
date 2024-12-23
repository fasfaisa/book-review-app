const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');

const router = express.Router();

// GET all reviews with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { rating, sortBy } = req.query;
    let query = Review.find();

    // Apply rating filter
    if (rating) {
      query = query.where('rating').equals(parseInt(rating));
    }

    // Apply sorting
    if (sortBy === 'newest') {
      query = query.sort('-createdAt');
    } else if (sortBy === 'oldest') {
      query = query.sort('createdAt');
    }

    const reviews = await query.exec();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// GET review by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID format' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST route to add a review
router.post('/', async (req, res) => {
  const { title, author, rating, reviewText } = req.body;

  // Validate required fields
  if (!title || !author || !rating || !reviewText) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate rating is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const newReview = new Review({
      title,
      author,
      rating,
      reviewText,
      createdAt: new Date() // Add creation date
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error: error.message });
  }
});

// PUT update a review
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID format' });
    }

    const { rating } = req.body;
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() }, // Add update date
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error: error.message });
  }
});

// DELETE a review
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID format' });
    }

    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});
// Add this below the existing routes
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sort ratings (1-5)
      }
    ]);

    const totalStats = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    const ratingDistribution = Array(5).fill(0);
    stats.forEach(stat => {
      ratingDistribution[stat._id - 1] = stat.count;
    });

    res.json({
      averageRating: totalStats[0]?.averageRating || 0,
      totalReviews: totalStats[0]?.totalReviews || 0,
      ratingDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;