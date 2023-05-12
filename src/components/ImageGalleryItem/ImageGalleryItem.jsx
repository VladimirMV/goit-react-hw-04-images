import './ImageGalleryItem.css';
import Modal from '../Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ item }) {
const { webformatURL } = item;
const [shownModal, setShownModal] = useState(false);

const onModal = () => {
setShownModal(!shownModal);
};

return (
<li className="ImageGalleryItem">
<img
     onClick={onModal}
     className="ImageGalleryItem-image"
     src={webformatURL}
     alt="img"
   />
{shownModal && <Modal onClose={onModal} image={item} />}
</li>
);
}

ImageGalleryItem.propTypes = {
item: PropTypes.shape({
webformatURL: PropTypes.string.isRequired,
}),
};

export default ImageGalleryItem;