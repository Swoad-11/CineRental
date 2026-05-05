import movieList from "@/app/data/data";
import { redirect } from "next/navigation";

export async function GET(_request, { params }) {
  const movieId = params.id;

  if (movieId && !movieList.results.find((movie) => movie.id === movieId)) {
    redirect("/api/movies");
  }

  const movie = movieList.results.find((movie) => movie.id === movieId);

  return Response.json(movie);
}

export async function PATCH(request, { params }) {
  const movie = await request.json();
  const movieId = params.id;
  const movieIndex = movieList.results.findIndex(
    (movie) => movie.id === movieId,
  );
  if (movieIndex !== -1) {
    movieList.results[movieIndex].title = movie.title;
    return Response.json(movieList.results[movieIndex]);
  } else {
    return Response.json({ error: "Movie not found" }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  const movieId = params.id;
  const movieIndex = movieList.results.findIndex(
    (movie) => movie.id === movieId,
  );
  if (movieIndex !== -1) {
    const movieToDelete = movieList.results[movieIndex];
    movieList.results.splice(movieIndex, 1);
    return Response.json(movieToDelete);
  } else {
    return Response.json({ error: "Movie not found" }, { status: 404 });
  }
}
