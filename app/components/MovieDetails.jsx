import Image from "next/image";
import { getMovieById } from "../[lang]/movies";
import { getDictionary } from "../[lang]/dictionaries";

const StatChip = ({ label, value }) => (
  <div className="flex-1 rounded-lg border border-white/6 bg-[#18181C] px-3 py-2.5">
    <span className="block text-[9px] tracking-[0.1em] uppercase text-[#5A574F] mb-1">
      {label}
    </span>
    <span className="text-sm font-medium text-[#C9A84C]">{value}</span>
  </div>
);

const MovieDetails = async ({ id, lang }) => {
  const movie = await getMovieById(id);
  if (!movie) return null;

  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    overview,
    release_date,
  } = movie;

  const dictionary = await getDictionary(lang);

  // 1. Create the full URL for the image
  // 'w780' is good for banners, 'w342' for smaller posters
  const fullImageUrl = `https://image.tmdb.org/t/p/w780${poster_path}`;

  return (
    <article>
      {/* ── Hero banner ── */}
      <div className="relative h-56 sm:h-72 w-full overflow-hidden">
        <Image
          src={fullImageUrl} // Use the full URL
          fill
          className="object-cover object-center brightness-[0.4]"
          alt=""
          aria-hidden
          priority // Load this banner immediately
        />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#111114] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#111114]/60 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="px-6 pb-8">
        <div className="flex gap-5 -mt-20 relative z-10 items-end mb-5">
          <div className="w-24 sm:w-28 shrink-0 rounded-lg overflow-hidden border border-[#C9A84C]/25 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
            <Image
              src={fullImageUrl} // Use the full URL here too
              width={112}
              height={168}
              style={{ width: "100%", height: "auto" }}
              alt={title}
              className="object-cover block"
            />
          </div>

          <div className="flex-1 min-w-0 pb-1">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#F0EDE6] leading-tight mb-1">
              {title}
            </h2>
            <p className="text-[10px] tracking-widest uppercase text-[#5A574F]">
              Released {release_date}
            </p>
          </div>
        </div>

        {/* ... existing code for stats and overview ... */}
        <div className="flex gap-4 items-start mb-6">
          <div className="flex gap-2 flex-1 min-w-0">
            <StatChip label="Avg. Vote" value={`${vote_average} / 10`} />
            <StatChip label="Votes" value={vote_count?.toLocaleString()} />
            <StatChip label="Popularity" value={popularity?.toFixed(1)} />
            <StatChip label="Year" value={release_date?.slice(0, 4) ?? "—"} />
          </div>
        </div>

        <p className="text-sm text-[#9B978D] italic leading-relaxed mb-8">
          {overview}
        </p>

        <div className="flex gap-4 shrink-0 pb-1">
          <button className="h-10 px-5 rounded-lg whitespace-nowrap bg-[#C9A84C] border border-[#C9A84C] text-[#0A0A0B] text-[11px] font-bold tracking-widest uppercase hover:bg-[#B8963C] transition-colors duration-200">
            ▶ {dictionary.streamInHD}
          </button>
          <button className="h-10 px-5 rounded-lg whitespace-nowrap bg-transparent border border-white/12 text-[#9B978D] text-[11px] font-medium tracking-widest uppercase hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-200">
            ↓ {dictionary.downloadInHD}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieDetails;
