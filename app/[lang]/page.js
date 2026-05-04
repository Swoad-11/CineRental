import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import Footer from "../components/Footer";
import { getAllMovies } from "./movies";
import MovieList from "../components/MovieList";
import { getDictionary } from "./dictionaries";

const Home = async ({ params: { lang } }) => {
  const movies = await getAllMovies();
  const dictionary = await getDictionary(lang);

  return (
    <>
      {/*
        Pass MobileSidebar as a prop so Navbar stays a server component.
        MobileSidebar renders only the hamburger button at lg+ breakpoint
        (hidden lg:hidden on the button itself), and the full drawer on mobile.
      */}
      <Navbar mobileTrigger={<MobileSidebar dictionary={dictionary} />} />

      <main className="flex min-h-[calc(100vh-4rem)]">
        {/* Desktop sidebar — hidden below lg */}
        <div className="hidden lg:block w-[218px] shrink-0 border-r border-white/6 pl-6 pr-2 pt-8">
          <Sidebar lang={lang} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 px-5 sm:px-8 pt-8 pb-12">
          <MovieList lang={lang} movies={movies} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
