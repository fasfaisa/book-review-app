import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReviewList.css';
import RatingPieChart from './Chart.js';
import RatingBarChart from './BarChart.js';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reviews/stats/summary');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error.message);
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchReviews = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/reviews?';
      
      if (filterRating) {
        url += `rating=${filterRating}&`;
      }
      if (sortBy) {
        url += `sortBy=${sortBy}`;
      }

      const response = await axios.get(url);
      setReviews(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filterRating, sortBy]);

  const handleEdit = (reviewId) => {
    navigate(`/edit/${reviewId}`);
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // Message will disappear after 3 seconds
  
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [message]);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
      setMessage({ type: 'success', text: 'Review deleted successfully!' });
    } catch (err) {
      setError('Error deleting review');
      setMessage({ type: 'error', text: 'Failed to delete the review. Please try again.' });
      console.error('Error deleting review:', err);
    }
  };
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="review-list-container">
      <h2 className="title">Book Reviews</h2>
      
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="rating-filter">Filter by Rating:</label>
          <select
            id="rating-filter"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="filter-select"
          >
            <option value="">All Ratings</option>
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      {message && (
  <div className={`message ${message.type}`}>
    {message.text}
  </div>
)}
<div className="reviews-table-wrapper">
<table className="reviews-table">
      
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {reviews.length === 0 ? (
      <tr>
        <td colSpan="6" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          No results found for the selected rating.
        </td>
      </tr>
    ) : (
      reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.title}</td>
              <td>{review.author}</td>
              <td>{review.rating} / 5</td>
              <td>{review.reviewText}</td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td className="action-buttons">
                <button 
                  onClick={() => handleEdit(review._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(review._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>
<div className="charts-container">
  {stats && (
    <>
      <RatingPieChart ratingDistribution={stats.ratingDistribution} />
      <RatingBarChart ratingDistribution={stats.ratingDistribution} />
    </>
  )}
</div>
{stats && (
  <div className="stats-summary">
    <h3>Statistics Summary</h3>
    <p>Average Rating: {stats.averageRating.toFixed(2)} / 5</p>
    <p>Total Reviews: {stats.totalReviews}</p>
  </div>
)}
    </div>
    
  );
}

export default ReviewList;