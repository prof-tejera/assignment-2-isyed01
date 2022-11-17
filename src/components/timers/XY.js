import { CONFIG_XY } from '../../constants.js';
import TimeCounter from './TimeCounter';

const XY = () => {
    return <div className="wrapper" style={{ width: 400 }}>
        <TimeCounter conf={CONFIG_XY} />
        </div>
};
export default XY;
