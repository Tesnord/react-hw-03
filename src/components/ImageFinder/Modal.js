import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });

  const keyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const backdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={backdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  );
}
