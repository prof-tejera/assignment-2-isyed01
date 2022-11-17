import { CONFIG_COUNTDOWN } from '../../constants.js';
import TimeCounter from './TimeCounter';

const Countdown = () => {
    return <div className="wrapper" style={{ width: 400 }}>
        <TimeCounter conf={CONFIG_COUNTDOWN} />
        </div>
};

export default Countdown;
