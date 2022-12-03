import styled from "styled-components";


const Container = styled.div.attrs(
    props => ({
        style: {
            margin:         `${ props.fontSize * 0.5 }rem` || `0.35rem`,
            padding:        `-${ props.fontSize * 0.5 }rem` || `0.25rem`,

        },
    }))`
    display:inline-block;
    white-space: nowrap;
`

const RadioInput = styled.input`
    display:none;
`

const ACTIVE_COLOR = '#009688'
const Label = styled.label.attrs(
    props => ({
        style: {
            fontSize:       `${ props.fontSize }rem` || '1.5rem',
            height:         `${ props.fontSize * 1.125 }rem` || `1.75rem`,
            padding:        `${ props.fontSize * 0.5 }rem` || `0.5rem`,
            color:          props.fontColor || 'whitesmoke',
            backgroundColor: props.active ? ACTIVE_COLOR : props.bgColor ||  'black',
        },
    }))`
    display:inline-block;
    border:solid 1px green;

    &:nth-of-type(1) {
        border-top-left-radius:0.5rem;
        border-bottom-left-radius:0.5rem;
    }
    &:nth-of-type(2) {
        border-left: none;
        border-top-right-radius:0.5rem;
        border-bottom-right-radius:0.5rem;
    }
`



const BooleanField = ({ value=false, trueText='true', falseText='false', onChange=()=>{}, fontSize=1.5, fontColor='whitesmoke', bgColor='#212121' }) => {
    const randomName = `bool-${Math.random()}`
    const handleChange = (event) => onChange(Boolean(parseInt(event.target.value)))    

    return <Container fontSize={fontSize}>
        <RadioInput name={randomName} type='radio' id='trueValue' checked={value === true} value={1} onChange={handleChange} /> 
        <Label htmlFor='trueValue' fontSize={fontSize} active={value === true}>{trueText}</Label>
        
        <RadioInput name={randomName} type='radio' id='falseValue' checked={value === false} value={0} onChange={handleChange} /> 
        <Label htmlFor='falseValue' fontSize={fontSize} active={value === false}>{falseText}</Label>



    </Container>
}

export default BooleanField;