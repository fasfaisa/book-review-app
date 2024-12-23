
# Book Review Web Application

This is a full-stack web application that allows users to browse, add, edit, and delete book reviews. Users can submit their thoughts on books they've read, including ratings and comments, and filter or sort reviews. The app includes visual charts for statistical summaries of ratings.

---

## Features
- CRUD operations for book reviews.
- Filter reviews by rating.
- Sort reviews by newest or oldest.
- Display statistics with pie and bar charts.
- Responsive user interface.

---

## Tech Stack
- **Frontend:** React, React Router, Axios, Chart.js
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB (NoSQL)
- **Styling:** CSS

---



### Clone the Repository
```bash
https://github.com/fasfaisa/book-review-app.git
cd book-review-app
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/bookreviews
   ```
4. Start the backend server:
   ```bash
   nodemon server.js
   ```
   The backend will be running on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend will be running on `http://localhost:3000`.

---

## Backend

### Routes

#### Reviews API
| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| GET    | `/reviews`                | Get all reviews with filters.    |
| GET    | `/reviews/stats/summary`  | Get review statistics.           |
| POST   | `/reviews`                | Add a new review.                |
| PUT    | `/reviews/:id`            | Update an existing review.       |
| DELETE | `/reviews/:id`            | Delete a review by ID.           |

---

## Frontend

### Main Components
- `ReviewList`: Displays the list of reviews with filtering and sorting options.
- `Chart.js`: Pie chart for rating distribution.
- `BarChart.js`: Bar chart for rating distribution.

---

## Usage
1. Open the app in your browser at `http://localhost:3000`.
2. Add, edit, or delete reviews using the user interface.
3. Use the dropdown to filter reviews by rating.
4. View statistical summaries in pie and bar charts.

