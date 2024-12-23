const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// GET review by ID
router.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  res.json(review);
});

// GET all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// POST a new review
router.post('/', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
});

// PUT update a review
router.put('/:id', async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedReview);
});

// DELETE a review
router.delete('/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
