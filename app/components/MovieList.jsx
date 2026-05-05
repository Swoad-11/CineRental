import MovieCard from "./MovieCard";

const FILTER_LABELS = {
  trending: "Trending Now",
  "new-releases": "New Releases",
  "coming-soon": "Coming Soon",
  favorites: "My Favorites",
  "watch-later": "Watch Later",
};

export default function MovieList({ movies, lang, filter = "trending" }) {
  const heading = FILTER_LABELS[filter] ?? "Movies";

  return (
    <section>
      {/* Section heading driven by active filter */}
      <h2 className="font-playfair text-2xl font-semibold text-[#F0EDE6] mb-6">
        {heading}
        <span className="ml-3 text-sm font-sans font-normal text-[#5A574F]">
          {movies.length} titles
        </span>
      </h2>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-4xl mb-4 opacity-30">◷</span>
          <p className="text-[#9B978D] text-sm">Nothing here yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}
