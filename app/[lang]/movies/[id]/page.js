import Modal from "../../components/Modal";
import MovieDetails from "../../components/MovieDetails";
import { getDictionary } from "../dictionaries";

const MovieModal = async ({ params: { lang, id } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <Modal>
      <MovieDetails id={id} lang={lang} />
    </Modal>
  );
};

export default MovieModal;
