import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import '../../index.css';

const ImageFinder = () => {
  const [pictures, setPictures] = useState(null);
  const [imageFullscreen, setImageFullscreen] = useState({
    src: '',
    alt: '',
  });
  const key = useState('11378319-4d07950fa565dc4fcc7d93b54');
  const [query, setQuery] = useState('');
  const [per_page, setPer_page] = useState(20);
  const [loading, setLoading] = useState(false);
  const [load_more, setLoad_more] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const API = (query, per_page) =>
    `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&page=1&orientation=horizontal&per_page=${per_page}`;

  const searchParam = query => {
    setQuery(query);
    setLoading(true);
    setLoad_more(false);

    fetch(API(query, per_page))
      .then(res => res.json())
      .then(res => {
        setPictures(res);
        if (per_page < res.totalHits) setLoad_more(true);
      })
      .finally(() => setLoading(false));
  };

  const loadMore = () => {
    if (per_page < 200) {
      setPer_page(prevState => prevState + 20);
      let count = per_page + 20;
      fetch(
        `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&page=1&orientation=horizontal&per_page=${count}`,
      )
        .then(res => res.json())
        .then(res => setPictures(res));
    } else {
      setLoad_more(false);
    }
  };

  const imageFullscreenFunc = event => {
    setShowModal(!showModal);
    const img = pictures.hits.filter(
      picture => picture.id === +event.currentTarget.alt,
    );
    setImageFullscreen({ src: img[0].largeImageURL, alt: img[0].id });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setImageFullscreen({ src: '', alt: '' });
  };

  return (
    <div className="App">
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageFullscreen.src} alt={imageFullscreen.alt} />
        </Modal>
      )}
      <Searchbar onSubmit={searchParam} />
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery items={pictures} onClick={imageFullscreenFunc} />
      )}
      {load_more && <Button onClick={loadMore} />}
    </div>
  );
};

export default ImageFinder;
