import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import EmptyState from "./Pages/EmptyState/EmptyState";
import CreateMovie from "./Pages/CreateMovie/CreateMovie";
import MovieList from "./Pages/MovieList/MovieList";
import EditPage from "./Pages/EditPage/EditPage";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([])

   useEffect(() => {
     const loggedInUser = localStorage.getItem("isLoggedIn");
     if (loggedInUser) {
       setIsLoggedIn(true);
       const storedMovies =
         JSON.parse(localStorage.getItem(loggedInUser)) || [];
       setMovies(storedMovies);
     }
   }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", email);   
    setIsLoggedIn(true);
    
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
     setIsLoggedIn(false);
  }

   const addMovieHandler = (newMovie) => {
      const currentUser = localStorage.getItem("isLoggedIn");
      const userMovies = JSON.parse(localStorage.getItem(currentUser)) || [];
      const newMovieWithId = { ...newMovie, id: Date.now().toString() };
      const updatedMovies = [...userMovies, newMovieWithId];
     
      localStorage.setItem(currentUser, JSON.stringify(updatedMovies));
     setMovies(updatedMovies);
   };

   const updateMovieHandler = (updatedMovie) => {
       const currentUser = localStorage.getItem("isLoggedIn");
       const updatedMovies = movies.map((movie) => 
          movie.id === updatedMovie.id ? updatedMovie : movie
      );

       setMovies(updatedMovies);
       localStorage.setItem(currentUser, JSON.stringify(updatedMovies));
   };
   
   
  return (
    <div>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/MovieList" : "/Login"} />}
          />
          <Route
            path="/Login"
            element={
              isLoggedIn ? (
                <Navigate to="/EmptyState" />
              ) : (
                <Login onLogin={loginHandler} />
              )
            }
          />
          <Route
            path="/EmptyState"
            element={isLoggedIn ? <EmptyState /> : <Navigate to="/Login" />}
          />
          <Route
            path="/CreateMovie"
            element={
              isLoggedIn ? (
                <CreateMovie onAddMovie={addMovieHandler} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/MovieList"
            element={
              isLoggedIn ? (
                <MovieList movies={movies} onLogout={logoutHandler} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/EditPage/:id"
            element={
              isLoggedIn ? (
                <EditPage movies={movies} onUpdateMovie={updateMovieHandler} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
