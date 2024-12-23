import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditReview.css';

function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 1,
    reviewText: '',
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        if (response.data) {
          setFormData({
            title: response.data.title || '',
            author: response.data.author || '',
            rating: response.data.rating || 1,
            reviewText: response.data.reviewText || '',
          });
        }
      } catch (err) {
        setError('Failed to fetch review details');
        console.error('Error fetching review:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/reviews/${id}`, formData);
      alert('Review Updated Successfully');
      navigate('/');
    } catch (err) {
      alert('Failed to update review');
      console.error('Error updating review:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) return <div className="form-container">Loading...</div>;
  if (error) return <div className="form-container error">{error}</div>;

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title"
            name="title"
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Enter book title" 
            className="form-input" 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input 
            type="text" 
            id="author"
            name="author"
            value={formData.author} 
            onChange={handleChange} 
            placeholder="Enter book author" 
            className="form-input" 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input 
            type="number" 
            id="rating"
            name="rating"
            value={formData.rating} 
            onChange={handleChange} 
            min="1" 
            max="5" 
            placeholder="Rating (1-5)" 
            className="form-input" 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewText">Review</label>
          <textarea 
            id="reviewText"
            name="reviewText"
            value={formData.reviewText} 
            onChange={handleChange} 
            placeholder="Write your review" 
            className="form-textarea" 
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Update Review</button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="form-button cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReview;