import Image from "next/image";
import Link from "next/link";
import genreMapping from "../data/genreID";
import { getDictionary } from "../[lang]/dictionaries";

const StarRating = ({ rating }) => {
  const filled = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[10px] ${
            i < filled
              ? "text-[#C9A84C]"
              : i === filled && half
                ? "text-[#C9A84C]/60"
                : "text-white/15"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-[10px] text-[#9B978D]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const MovieCard = async ({ movie, lang }) => {
  const dictionary = await getDictionary(lang);
  const { title, vote_average, poster_path, genre_ids, id } = movie;

  const rating = vote_average / 2;
  const genres = genre_ids
    .map((gid) => genreMapping[gid])
    .filter(Boolean)
    .join(" / ");

  return (
    <figure
      className="
        group flex flex-col
        rounded-xl overflow-hidden
        border border-white/6 bg-[#18181C]
        hover:border-[#C9A84C]/30 hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Poster */}
      <div className="relative overflow-hidden">
        <Image
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          width={0}
          height={0}
          src={poster_path}
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ width: "100%", height: "auto" }}
          alt={title}
        />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#18181C] to-transparent" />

        {/* Rating badge */}
        <div
          className="
            absolute top-3 right-3
            flex items-center gap-1
            px-2 py-1 rounded-full
            bg-black/70 backdrop-blur-sm
            border border-[#C9A84C]/25
            text-[#C9A84C] text-[11px] font-medium
          "
        >
          ★ {(vote_average / 2).toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <figcaption className="flex flex-col gap-2 p-4 pt-3">
        {/* Genre */}
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#5A574F]">
          {genres}
        </p>

        {/* Title */}
        <h3 className="font-playfair text-base font-semibold text-[#F0EDE6] leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Stars */}
        <StarRating rating={rating} />

        {/* CTA */}
        <Link
          href={`/movies/${id}`}
          className="
            mt-1 flex items-center justify-center gap-1.5
            h-9 rounded-lg
            border border-[#C9A84C]/30 bg-transparent
            text-[#C9A84C] text-[11px] font-medium tracking-[0.08em] uppercase
            hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]
            transition-all duration-200
          "
        >
          <span>▶</span>
          <span>{dictionary.details}</span>
        </Link>
      </figcaption>
    </figure>
  );
};

export default MovieCard;
