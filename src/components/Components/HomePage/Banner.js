import { useEffect, useState } from "react";
import classes from "./Banner.module.css";
import useHttp from "../../hooks/use-http";

const Banner = () => {
  const API_KEY = "c65a87c97361330a7f675e8a86d0bbf1";
  const [data, setData] = useState({ backdrop_path: "" });
  const request = `/discover/tv?api_key=${API_KEY}&with_network=123`;

  // Lấy dữ liệu API
  const { sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    const getRandomMovie = (movie) => {
      setData(
        movie.results[Math.floor(Math.random() * movie.results.length - 1)]
      );
    };
    fetchMovie({ url: request }, getRandomMovie);
  }, []);

  return (
    <div className={classes.banner}>
      <img
        // Kiểm tra đường dẫn backdrop có không, nếu không đổi sang poster
        src={`${
          data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : ""
        }`}
        alt=""
      ></img>
      <div className={classes.description}>
        <h1>{data.name}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{data.overview === "" ? "Not overview" : data.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
