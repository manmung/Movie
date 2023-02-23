import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import MovieDetail from "../HomePage/MovieDetail";
import classes from "./ResultList.module.css";

const ResultList = (props) => {
  const API_KEY = "c65a87c97361330a7f675e8a86d0bbf1";
  const [data, setData] = useState([]);
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClickMovie, setIsClickMovie] = useState(false);
  const request = `/search/movie?api_key=${API_KEY}&language=en-US&query=${props.query}`;

  // Lấy dữ liệu
  const { sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    setIsClickMovie(false);
    const getMovie = (data) => {
      setData(data.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [request]);

  // Sự kiện khi click movie
  const onClickMovieHandler = (event) => {
    const index = data.findIndex((e) => e.id === +event.target.id);
    if (+event.target.id === clickedMovie.id && isClickMovie) {
      setIsClickMovie(false);
    } else {
      window.scroll(event.pageX, event.pageY - 150);
      setClickedMovie(data[index]);
      setIsClickMovie(true);
    }
  };

  return (
    <div className={classes.result}>
      <h2>Search Result</h2>
      <div className={classes.movie}>
        {data.length === 0 ? (
          <h3>Not Found Movie</h3>
        ) : (
          data.map((movie) => (
            <img
              onClick={onClickMovieHandler}
              key={movie.id}
              id={movie.id}
              src={`${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : ""
              }`}
              alt=""
            ></img>
          ))
        )}
      </div>
      {isClickMovie ? <MovieDetail movie={clickedMovie} /> : ""}
    </div>
  );
};

export default ResultList;
