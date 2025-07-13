// React
import { ReactElement } from 'react';

// Styles
import './Backdrop.css';

interface Props {
    children: ReactElement;
    handleClose?: () => void;
}

const Backdrop = ({ children, handleClose }: Props) => {
    return (
        <div
            className="Backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget && handleClose) {
                    handleClose();
                }
            }}
        >
            {children}
        </div>
    );
};

export default Backdrop;
