import {
  Link,
  useParams,
  // useOutletContext,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../Authorization/ProtectedRoute";
import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BASE_URL;

const Review = ({ review, reviews, setReviews }) => {
  const user = useAuth();
  // const [username, setUserName] = useState("");
  // const [loading, setLoading] = useState(true);
  const { teapot_id } = useParams();
  const navigate = useNavigate();

  const formattedDate = (reviewDate) => {
    const parts = reviewDate.split("-");
    const newReviewDate = new Date(parts[0], parts[1] - 1, parts[2]);
    return newReviewDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (confirm(`Are you sure you want to delete your review?`)) {
      fetch(`${URL}/api/teapots/${teapot_id}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          const copyReviewArray = [...reviews];
          const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id;
          });
          copyReviewArray.splice(indexDeletedReview, 1);
          setReviews(copyReviewArray);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="review-card">
      <h3>Username: {review.username}</h3>
      <p className="center-grid">Rating: {"⭐️".repeat(review.rating)}</p>
      {review.updated_at ? (
        <p className="center-grid">
          {formattedDate(review.updated_at)} (Edited)
        </p>
      ) : (
        <p className="center-grid">{formattedDate(review.created_at)}</p>
      )}

      <p>{review.content}</p>

      {user.isAuthenticated && user.user.id === review.user_id && (
        <div className="center-grid">
          <Link to={`/teapots/${teapot_id}/edit/${review.id}`}>
            <button
              className="center-grid"
              style={{ textDecoration: "none", color: "black" }}
            >
              Edit
            </button>
          </Link>
          <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Review;
