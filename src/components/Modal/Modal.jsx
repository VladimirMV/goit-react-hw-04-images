import './Modal.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

function Modal(props) {
const { image, onClose } = props;

useEffect(() => {
function keyDown(e) {
if (e.code === 'Escape') {
onClose();
}
}
window.addEventListener('keydown', keyDown);

return () => {
  window.removeEventListener('keydown', keyDown);
};
}, [onClose]);

function onOverlayClose(e) {
if (e.currentTarget === e.target) {
onClose();
}
}

return createPortal(
<div onClick={onOverlayClose} className="Overlay">
<div className="Modal">
<img src={image.largeImageURL} alt="img" className="Img-Modal" />
</div>
</div>,
ModalRoot
);
}

Modal.propTypes = {
image: PropTypes.object,
onClose: PropTypes.func,
};

export default Modal;