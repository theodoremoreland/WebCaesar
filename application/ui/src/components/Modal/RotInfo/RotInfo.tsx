import { ReactElement } from "react";

import Modal from "../Modal";

// Images

interface Props {
    handleClose: () => void;
}

const RotInfo = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal title="Change Rotation" handleClose={handleClose}>
            <div>
                <article>
                    <h3>How to change the rotation</h3>
                    <p>
                        To change the rotation (rot), use the columns in the
                        middle of the page. The columns can be dragged
                        vertically to change the rot.
                        <br />
                        <br />
                        The left column is the original language, and the right
                        column is the rotated language. The rot will be applied
                        to the original language and output in the rotated
                        language.
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
