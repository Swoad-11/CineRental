import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileSidebar from "../../components/MobileSidebar";
import Modal from "../../components/Modal";
import MovieDetails from "../../components/MovieDetails";
import { getMovieById } from "../movies";
import { getDictionary } from "../dictionaries";

const MoviePage = async ({ params: { lang, id } }) => {
  const movie = await getMovieById(id);
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Navbar mobileTrigger={<MobileSidebar dictionary={dictionary} />} />
      <Modal>
        <MovieDetails id={id} lang={lang} />
      </Modal>
      <Footer />
    </>
  );
};

export default MoviePage;
