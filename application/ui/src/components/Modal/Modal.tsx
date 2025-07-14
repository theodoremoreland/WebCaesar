// React
import { ReactElement } from 'react';

// Custom components
import Backdrop from './Backdrop';

// Styles
import './Modal.css';

interface Props {
    children: ReactElement;
    title: string;
    handleClose: () => void;
}

const Modal = ({ children, title, handleClose }: Props) => {
    return (
        <Backdrop handleClose={handleClose}>
            <div className="Modal">
                <nav>
                    <button
                        type="button"
                        title="Close modal"
                        aria-label="Close modal"
                        className="close-button"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </nav>
                <h2 className="title">{title}</h2>
                <div className="content">{children}</div>
            </div>
        </Backdrop>
    );
};

export default Modal;
