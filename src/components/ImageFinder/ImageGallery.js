import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ items, onClick }) {
  if (items) {
    return (
      <ul className="ImageGallery">
        {items &&
          items.hits.map(item => (
            <ImageGalleryItem item={item} key={item.id} onClick={onClick} />
          ))}
      </ul>
    );
  }
}
