export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={onClick}
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt={item.id}
      />
    </li>
  );
}
