// React
import { ReactElement } from 'react';

// Components
import Backdrop from '../Backdrop';

// Images
import WreathIcon from '../../../assets/images/wreath.svg?react';

// Styles
import './Loading.css';

interface LoadingProps {
    text: string;
}

const Loading = ({ text }: LoadingProps): ReactElement => {
    return (
        <Backdrop>
            <div className="Loading">
                <p>{text}</p>
                <WreathIcon className="wreath" />
            </div>
        </Backdrop>
    );
};

export default Loading;
