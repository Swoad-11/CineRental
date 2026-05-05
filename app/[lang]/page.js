import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/MobileSidebar";
import Footer from "../components/Footer";
import { getAllMovies } from "./movies";
import MovieList from "../components/MovieList";
import { getDictionary } from "./dictionaries";

const Home = async ({ params: { lang } }) => {
  const movies = await getAllMovies();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar mobileTrigger={<MobileMenu dictionary={dictionary} />} />

      <main className="flex min-h-[calc(100vh-4rem)]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-[218px] shrink-0 border-r border-white/6 pl-6 pr-2 pt-8">
          <Sidebar lang={lang} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 px-5 sm:px-8 pt-8 pb-12">
          <MovieList lang={lang} movies={movies} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
