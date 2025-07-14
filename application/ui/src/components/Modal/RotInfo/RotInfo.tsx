import { ReactElement } from 'react';

import Modal from '../Modal';

// Images
import letterDrag from '../../../assets/images/letter_drag.gif';

interface Props {
    title: string;
    handleClose: () => void;
}

const RotInfo = ({ title, handleClose }: Props): ReactElement => {
    return (
        <Modal title={title} handleClose={handleClose}>
            <div>
                <article>
                    <h3>How to change the rotation</h3>
                    <div className="img-container">
                        <img src={letterDrag} alt="Dragging letters" />
                    </div>
                    <p>
                        To change the rotation, use the two letter columns in
                        the middle of the page. Each column can be dragged or
                        scrolled vertically. Letters in the left column will be
                        replaced by their adjacent letters in the right column.
                    </p>
                    <p>
                        The rot can be positive or negative, but is positive by
                        default. Double click on one of the columns to toggle
                        between positive and negative rotations.
                    </p>
                </article>
            </div>
        </Modal>
    );
};

export default RotInfo;
