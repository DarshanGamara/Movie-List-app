import "./EmptyState.css";
import { useNavigate } from "react-router-dom";

function EmptyState(props) {
   const navigate = useNavigate();

   const navigateToCreateMovie = () => {
       navigate("/CreateMovie")
   }

  return (
    <div className="empty-div">
      <div className="empty-list">
        <h2>Your movie list is empty</h2>
        <button className="add-movie-btn" onClick={navigateToCreateMovie}>
          Add a new movie
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
