const API_KEY = "9e9c440c96a819a5e64296756fa4e7a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const FILTER_ENDPOINTS = {
  trending: "/trending/movie/week",
  "new-releases": "/movie/now_playing",
  "coming-soon": "/movie/upcoming",
  "top-rated": "/movie/top_rated",
  popular: "/movie/popular",
};

function normalizeMovie(movie) {
  return {
    ...movie,
    poster_path: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path
      ? `${IMG_BASE}${movie.backdrop_path}`
      : null,
  };
}

export async function movieList(filter = "trending") {
  const endpoint = FILTER_ENDPOINTS[filter] ?? FILTER_ENDPOINTS["trending"];

  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  return data.results.map(normalizeMovie);
}
