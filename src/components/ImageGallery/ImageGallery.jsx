import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';
import PropTypes from 'prop-types';

function ImageGallery({ items }) {
  return (
    <>
      <ul className="ImageGallery">
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array,
};
export default ImageGallery;
