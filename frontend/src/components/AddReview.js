import React, { useState } from 'react';
import axios from 'axios';
import './AddReview.css';

function AddReview() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 1,
    reviewText: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/reviews', formData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        console.error(err);
        alert('Error adding review');
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="form-input"
        />
        <textarea
          placeholder="Review"
          value={formData.reviewText}
          onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
          className="form-textarea"
        />
        <button type="submit" className="form-button">Add Review</button>
      </form>
    </div>
  );
}

export default AddReview;
