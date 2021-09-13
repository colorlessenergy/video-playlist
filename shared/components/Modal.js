import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, toggleModal, children }) => {
    const modalRef = useRef(null);
    const handleCloseModal = (event) => {
        if (modalRef.current === event.target) {
            toggleModal();
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-is-open');
        } else {
            document.body.classList.remove('modal-is-open');
        }

        return () => {
            document.body.classList.remove('modal-is-open');
        }
    }, [ isOpen ]);

    return (
       <div
        ref={ modalRef }
        onClick={ toggleModal === undefined ? (null) : (handleCloseModal) }
        className={`modal ${ isOpen ? "flex" : "d-none" }`}>
           <div className="modal-content">
               { children }
            </div>
       </div>
    );
}

export default Modal;