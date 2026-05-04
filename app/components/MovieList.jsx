import MovieCard from "./MovieCard";

export default function MovieList({ movies, lang }) {
  return (
    <section>
      <div
        className="
          grid gap-5
          grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
        "
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} lang={lang} />
        ))}
      </div>
    </section>
  );
}
