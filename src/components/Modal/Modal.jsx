import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <img src={imageUrl} alt="" className={styles.modalImage} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
