import styled from "styled-components";

const Container = styled.div`
  display:flex;
  flex:1;
  align-items: stretch;
  padding: 0.5rem 1rem;
  margin-top:2rem;
  column-gap:1%;
`
const TimeUnit = styled.div`
  flex:1;
  font-size: 3rem;
  color:#434343;
  white-space: nowrap;
  text-align:center;
`
const Colon = styled(TimeUnit)`
  flex:0.25;
  font-size: 3rem;
  font-weight: regular;
  text-align:center;
  margin-top:0rem;
`
const Milliseconds = styled(TimeUnit)`
  flex: 0.25;
  display:inline-block;
  font-size: 1.5rem;
  margin-top:1.5rem;
  margin-bottom:1.5rem;
`
const Digit = styled.span.attrs(
  props => ({
    style: {
      color: props.color || 'gray',
    },
  }))`
  display: inline-block;
`
const Decimal = styled.span`
  display: inline-block;
  padding-right: 0.25rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: gray;
`


///////////////////////////////////////////////////////////////
//
//  Add leading zeroes as needed
// 
/** 
 * @param digits Number Total digits to return
 * @param value Number The value to format
 * @returns STring 
 */

const zerofill = (digits, value) => `000${value}`.slice(-digits);


///////////////////////////////////////////////////////////////
//
//  Add leading zeroes as needed
// 
/** 
 * @param digits Number Total digits to return
 * @param value Number The value to format
 * @returns String
 */

const zerofillMS = (digits, value) => {
  if (digits === 0) return '';
  let dec = value / 1000; // convert to decimal
  let ms = parseFloat(dec.toFixed(digits)); // adjust for precision
  ms = ms === 1 ? 0.999 : ms; // adjust for when rounded up to 1;
  ms = `${ms}0000`.substring(2, 2 + digits) // zerofill
  // console.log(`msPrecision( ${value}, ${MILLISECONDS_PRECICION} ) : ${dec} = ${ms} `)
  return ms;
}


///////////////////////////////////////////////////////////////
//
//  Get time digits in an array
// 
/** 
 * @param time Number Total time in milliseconds to display (not a full timestamp)
 * @param msNumDigits Number Number of digits to display for milliseconds
 * @returns Array of individual digits in an array (ms is together): [H,H,M,M,S,S,MS]
 */

const getDigits = (time, msNumDigits) => {

  const date = new Date()
  date.setTime(time)

  const hours = zerofill(2, date.getUTCHours())
  const minutes = zerofill(2, date.getUTCMinutes())
  const seconds = zerofill(2, date.getUTCSeconds())
  const ms = zerofillMS(msNumDigits, date.getMilliseconds())

  return `${hours}${minutes}${seconds}`.split("").concat(ms) 
 
}


///////////////////////////////////////////////////////////////
//
//  Main: Displays the time digits
// 
/** 
 * @param time Number Total time in milliseconds to display (not a full timestamp)
 * @param active Boolean Is it in active state?
 * @param done Boolean Has the progress completed?
 * @param msNumDigits Number Number of digits to display for milliseconds
 * @param defaultColor String CSS color for displaying inactive or incomplete portions
 * @param activeColor String CSS color for highlighting currently active fill indicator
 * @param doneColor String CSS color for highlighting completed fill indicator(s)
 * @returns TimeDisplay component
 */

const TimeDisplay = ({ time, active=false, done=false, msNumDigits=3, defaultColor='grey', activeColor='green', doneColor='blue' }) => {
  const digits = getDigits(time, msNumDigits);
  const startIndex = !active ? -1 : digits.findIndex(digit => digit !== '0');
  const getColor = (index) => (!active || index < startIndex) ? defaultColor : !done ? activeColor : doneColor;
  return <>
 
    <Container>
      <TimeUnit>
        <Digit color={getColor(0)}>{digits[0]}</Digit>
        <Digit color={getColor(1)}>{digits[1]}</Digit>
      </TimeUnit>
      <Colon>:</Colon>
      <TimeUnit>
        <Digit color={getColor(2)}>{digits[2]}</Digit>
        <Digit color={getColor(3)}>{digits[3]}</Digit>
      </TimeUnit>
      <Colon>:</Colon>
      <TimeUnit>
        <Digit color={getColor(4)}>{digits[4]}</Digit>
        <Digit color={getColor(5)}>{digits[5]}</Digit>
      </TimeUnit>
      <Milliseconds>
        <Decimal>.</Decimal>
        <Digit color={getColor(6)}>{digits[6]}</Digit>
      </Milliseconds>

    </Container>

  </>

}

export default TimeDisplay;


