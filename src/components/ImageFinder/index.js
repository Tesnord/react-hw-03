import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import '../../index.css';

class ImageFinder extends Component {
  state = {
    pictures: null,
    imageFullscreen: {
      src: '',
      alt: '',
    },
    key: '11378319-4d07950fa565dc4fcc7d93b54',
    query: '',
    per_page: 20,
    page: 1,
    loading: false,
    load_more: false,
    showModal: false,
  };

  API = (query, per_page) =>
    `https://pixabay.com/api/?key=${this.state.key}&q=${query}&image_type=photo&page=1&orientation=horizontal&per_page=${per_page}`;

  searchParam = query => {
    this.setState({ query: query, loading: true, load_more: false });
    fetch(this.API(query, this.state.per_page))
      .then(res => res.json())
      .then(res => {
        this.setState({
          pictures: res,
        });
        if (this.state.per_page < res.totalHits)
          this.setState({ load_more: true });
      })
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    if (this.state.per_page < 200) {
      this.setState(prevState => ({
        per_page: prevState.per_page + 20,
      }));
      let per_page = this.state.per_page + 20;
      fetch(
        `https://pixabay.com/api/?key=${this.state.key}&q=${this.state.query}&image_type=photo&page=1&orientation=horizontal&per_page=${per_page}`,
      )
        .then(res => res.json())
        .then(res =>
          this.setState({
            pictures: res,
          }),
        );
    } else {
      this.setState({ load_more: false });
    }
  };

  imageFullscreen = event => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    const img = this.state.pictures.hits.filter(
      picture => picture.id === +event.currentTarget.alt,
    );
    this.setState({
      imageFullscreen: { src: img[0].largeImageURL, alt: img[0].id },
    });
  };

  toggleModal = event => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    this.setState({
      imageFullscreen: { src: '', alt: '' },
    });
  };

  render() {
    const { pictures, imageFullscreen, loading, load_more, showModal } =
      this.state;
    const searchParam = this.searchParam;
    const loadMore = this.loadMore;

    return (
      <div className="App">
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imageFullscreen.src} alt={imageFullscreen.alt} />
          </Modal>
        )}
        <Searchbar onSubmit={searchParam} />
        {loading ? (
          <Loader />
        ) : (
          <ImageGallery items={pictures} onClick={this.imageFullscreen} />
        )}
        {load_more && <Button onClick={loadMore} />}
      </div>
    );
  }
}

export default ImageFinder;
