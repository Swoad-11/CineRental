import Modal from "../../components/Modal";
import MovieDetails from "../../components/MovieDetails";

const MovieModal = async ({ params: { id, lang } }) => {
  return (
    <Modal>
      <MovieDetails id={id} lang={lang} />
    </Modal>
  );
};

export default MovieModal;
