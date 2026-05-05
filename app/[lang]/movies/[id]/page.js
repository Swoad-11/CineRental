import Modal from "@/app/components/Modal";
import MovieDetails from "@/app/components/MovieDetails";
import { getDictionary } from "@/app/[lang]/dictionaries";

const MovieModal = async ({ params: { lang, id } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <Modal>
      <MovieDetails id={id} lang={lang} />
    </Modal>
  );
};

export default MovieModal;
