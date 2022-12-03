import styled from "styled-components";
import IntegerField from "./IntegerField";


const TimeInput = styled.div.attrs(
    props => ({
        style: {
            margin:         `${ props.fontSize * 0.5 }rem` || `0.35rem`,
            padding:        `-${ props.fontSize * 0.5 }rem` || `0.25rem`,
            backgroundColor: props.bgColor || 'black',
        },
    }))`
    display:inline-block;
    border-radius:0.5rem;
`



const TimeField = ({ value:{h, m, s}, onChange, fontSize=1.5, fontColor='whitesmoke', bgColor='#212121', }) => {
    const handleHours = (value) => onChange({ h:value, m, s })
    const handleMinutes = (value) => onChange({ h, m:value, s })
    const handleSeconds = (value) => onChange({ h, m, s:value })

    return <TimeInput bgColor={bgColor} fontSize={fontSize}>
        <IntegerField value={h} min={0} max={99} onChange={handleHours} fontSize={fontSize} fontColor={fontColor} bgColor={bgColor} wrapped={false} />
        :
        <IntegerField value={m} min={0} max={59} onChange={handleMinutes} fontSize={fontSize} fontColor={fontColor} bgColor={bgColor} wrapped={false} />
        :
        <IntegerField value={s} min={0} max={59} onChange={handleSeconds} fontSize={fontSize} fontColor={fontColor} bgColor={bgColor} wrapped={false} />
    </TimeInput>

}


export default TimeField;