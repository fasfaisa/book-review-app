import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function RatingBarChart({ ratingDistribution }) {
  const data = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Count',
        data: ratingDistribution,
        backgroundColor: '#8884d8',
      },
    ],
  };

  return (
    <div>
      <h3>Ratings Distribution (Bar Chart)</h3>
      <Bar data={data} />
    </div>
  );
}

export default RatingBarChart;
