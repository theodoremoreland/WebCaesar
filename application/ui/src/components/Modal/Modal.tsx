import { ReactElement } from "react";

// Styles
import "./Modal.css";

interface Props {
    children: ReactElement;
    title: string;
    handleClose: () => void;
}

const Modal = ({ children, title, handleClose }: Props) => {
    return (
        <div
            className="custom-modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="custom-modal">
                <header className="custom-modal-header">
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
                <h2 className="custom-modal-title">{title}</h2>
                <div className="custom-modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
