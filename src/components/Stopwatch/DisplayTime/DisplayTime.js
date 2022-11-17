import './DisplayTime.css'
import { DECIMAL_PRECISION } from '../../../config';


const CSS_DEFAULT_CLASS_NAME = '';
const CSS_ACTIVE_CLASS_NAME = 'active-font';
const CSS_COMPLETE_CLASS_NAME = 'active-font-dark';

const zerofill = (numDigits, value) => `000${value}`.slice(-numDigits);

const getDigits = ({ hours, minutes, seconds, ms }) => {
    const hh = zerofill( 2, hours );
    const mm = zerofill( 2, minutes );
    const ss = zerofill( 2, seconds );
    const xxx = zerofill( DECIMAL_PRECISION, ms );
    const str = `${hh}${mm}${ss}${xxx}`;
    const arr = str.split('');

    let isActive = false;
    const digits = arr.map(digit=>{
        isActive = isActive || parseInt(digit) > 0;
        return { value:digit, isActive:isActive }
    })

    const h = digits.splice(0,2)
    const m = digits.splice(0,2)
    const s = digits.splice(0,2)
    return { hours:h, minutes:m, seconds:s, ms:digits }
}


const Digit = ({ value:{ value, isActive} }) => (
    <span className={isActive ? CSS_ACTIVE_CLASS_NAME : CSS_DEFAULT_CLASS_NAME }>
        {value}
    </span>
)


const DisplayTime = ({ time }) => {
    const digits = getDigits(time)
    const { hours, minutes, seconds, ms } = digits;
    return <>
        <div className='time-display'>
            <div className='unit'>
                <Digit value={hours[0]} />
                <Digit value={hours[1]} />
            </div>
            <div className='colon'>:</div>
            <div className='unit'>
            <Digit value={minutes[0]} />
                <Digit value={minutes[1]} />
            </div>
            <div className='colon'>:</div>

            <div className='unit'>
                <Digit value={seconds[0]} />
                <Digit value={seconds[1]} />
            </div>
            <div className='decimal'>.</div>
            <div className='small'>
                {
                    ms.map((item, index)=><Digit key={index} value={item} />)
                }
            </div>
        </div>

    </>
}


export default DisplayTime;