// lib/movieService.js
export async function movieList() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=9e9c440c96a819a5e64296756fa4e7a7",
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  return data.results;
}
