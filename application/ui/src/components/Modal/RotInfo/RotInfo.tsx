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
                <article></article>
            </div>
        </Modal>
    );
};

export default RotInfo;
