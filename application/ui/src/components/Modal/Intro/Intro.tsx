// React
import { ReactElement } from 'react';

// Custom components
import Backdrop from '../Backdrop';

// Images
import letterDrag from '../../../assets/images/letter_drag.gif';

// Styles
import './Intro.css';

interface Props {
    handleClose: () => void;
}

const Intro = ({ handleClose }: Props): ReactElement => {
    return (
        <Backdrop>
            <div className="Intro">
                <h1 className="title">Web Caesar</h1>
                <p>
                    This web application allows you to encrypt and decrypt text
                    using the{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Caesar_cipher"
                        target="_blank"
                    >
                        Caesar's Cipher
                    </a>{' '}
                    technique.
                </p>
                <p>
                    The cipher works by replacing each letter with another
                    letter a fixed number of positions up or down the alphabet,
                    commonly referred to as a "rotation". For example, with a
                    rotation of 1, 'A' becomes 'B', 'B' becomes 'C', and so on.
                </p>
                <div className="img-container">
                    <img src={letterDrag} alt="Dragging letters" />
                </div>
                <p>
                    To change the rotation, use the two letter columns in the
                    middle of the page. Each column can be dragged or scrolled
                    vertically. Letters in the left column will be replaced by
                    their adjacent letters in the right column.
                </p>
                <p>
                    Input your text in the "Original text" area on the left, and
                    the rotated text will appear in the "Rotated text" area on
                    the right.
                </p>
                <p>
                    Words in the "Original text" area can be automatically
                    decrypted by clicking the "Decrypt" button on the lower left
                    of the "Original text" area.
                </p>
                <div className="button-container">
                    <button onClick={handleClose} aria-label="I understand">
                        I understand
                    </button>
                    <button
                        id="dont-show-again"
                        aria-label="Don't show this again"
                    >
                        Don't show this again
                    </button>
                </div>
            </div>
        </Backdrop>
    );
};

export default Intro;
