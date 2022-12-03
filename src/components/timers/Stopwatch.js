import { CONFIG_STOPWATCH } from '../../constants.js';
import TimeCounter from './TimeCounter';

const Stopwatch = () => {
    return <div className="wrapper" style={{ width: 400 }}>
        <TimeCounter conf={CONFIG_STOPWATCH} />
        </div>
};

export default Stopwatch;
