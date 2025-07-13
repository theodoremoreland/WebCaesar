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
                <header>
                    {/* Putting the onClick handler on the div because
                    the padding on the button wasn't triggering to onClick event.
                    This is a workaround to make the button padding clickable.
                */}
                    <div onClick={handleClose}>
                        <button
                            type="button"
                            title="Close"
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                </header>
                <h2 className="title">{title}</h2>
                <div className="content">{children}</div>
            </div>
        </Backdrop>
    );
};

export default Modal;
