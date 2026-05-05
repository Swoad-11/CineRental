import "server-only";
import { movieList } from "../data/data"; // Make sure path is correct

export const getAllMovies = async () => {
  const movies = await movieList();
  return movies;
};

export const getMovieById = async (id) => {
  const movies = await movieList();
  return movies.find((movie) => movie.id == id);
};
