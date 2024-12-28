import "./MovieList.css";
import { LuLogOut } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MovieList({movies, onLogout}) {
   const [currentPage, setCurrentPage] = useState(1);
   const moviesPerPage = 8;
   const navigate = useNavigate();
   
   const totalPages = Math.ceil(movies.length / moviesPerPage);
   const indexOfLastItem = currentPage * moviesPerPage;
   const indexOfFirstItem = indexOfLastItem - moviesPerPage;
   const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

   const goToPrevPage = () => {
       if(currentPage > 1) setCurrentPage((prev) => prev - 1)
   }

   const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
   }

    const goToPage = (page) => {
      setCurrentPage(page);
    };
     
   const logoutHandler = () => {  
      onLogout();
      navigate("/Login")
   }

    return (
      <div className="movielist-div">
        <nav className="navbar">
          <div className="div-heading">
            <h2 className="movie-h2">My movies</h2>
            <IoIosAddCircleOutline
              className="add-circle"
              onClick={() => navigate("/CreateMovie")}
            />
          </div>
          <div className="div-logout" onClick={logoutHandler}>
            <p className="logout">Logout</p>
            <LuLogOut className="btn-logout" />
          </div>
        </nav>

        <div className="movie-card">
          
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (   
              <div
                className="description"
                key={movie.id || index}
                onClick={() => navigate(`/EditPage/${movie.id || index}`)}
              >
                <div className="movie-pic">
                  <img src={movie.image} alt={movie.title} />
                </div>
                <div className="movie-text">
                  <p className="name">{movie.title}</p>
                  <p className="year-num">{movie.year}</p>
                </div>
              </div>   
            ))
          ) : (
            <p className="empty-message">No movies found. Add a new movie!</p>
          )}
        </div>
        <div className="page-div">
          <p
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            onClick={goToPrevPage}
          >
            Prev
          </p>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <p
            className={`next${currentPage === totalPages ? "disables" : ""}`}
            onClick={goToNextPage}
          >
            Next
          </p>
        </div>
      </div>
    );
}

export default MovieList;