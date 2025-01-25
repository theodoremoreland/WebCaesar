import { ReactElement } from "react";

import Modal from "../Modal";

// Images
import letterDrag from "../../../assets/images/letter_drag.gif";

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
                        <img src={letterDrag} alt="" />
                    </div>
                    <p>
                        To change the rotation (rot), use the two letter columns
                        in the middle of the page. Each column can be dragged or
                        scrolled vertically to change the rotation amount.
                        <br />
                        <br />
                        The left column represents letters in the original text
                        and the right column represents letters in the rotated
                        text. The relationship between the two always reads left
                        to right.
                        <br />
                        <br />
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
