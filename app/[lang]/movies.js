import "server-only";
import { movieList } from "../data/data";

export const getAllMovies = async (filter = "trending") => {
  const movies = await movieList(filter);
  return movies;
};

export const getMovieById = async (id) => {
  // Fetch directly by ID — more efficient than loading the whole list,
  // and returns full movie details (runtime, tagline, genres object, etc.)
  const API_KEY = "9e9c440c96a819a5e64296756fa4e7a7";
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) return null;

  const movie = await res.json();
  return {
    ...movie,
    poster_path: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path
      ? `${IMG_BASE}${movie.backdrop_path}`
      : null,
  };
};
