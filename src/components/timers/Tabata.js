import { CONFIG_TABATA } from '../../constants.js';
import TimeCounter from './TimeCounter';

const Tabata = () => {
    return <div className="wrapper" style={{ width: 400 }}>
        <TimeCounter conf={CONFIG_TABATA} />
        </div>
};
export default Tabata;
