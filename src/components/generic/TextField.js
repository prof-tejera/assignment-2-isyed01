import styled from "styled-components";


const TextInput = styled.input.attrs(
    props => ({
        style: {
            fontSize:       `${ props.fontSize }rem` || '1.5rem',
            height:         `${ props.fontSize * 1.125 }rem` || `1.75rem`,
            padding:        `${ props.fontSize * 0.5 }rem` || `0.25rem`,
            margin:         `${ props.fontSize * 0.5 }rem` || `0.35rem`,
            color:          props.fontColor || 'whitesmoke',
            backgroundColor: props.bgColor || 'black',
        },
    }))`
    text-align:left;
    border:none;
    border-radius:0.5rem;

    &:focus{
        outline: none;
    }
    
    &:active {
        outline: none;
    }
`

const TextField = ({ value=0, onChange=()=>{}, fontSize=1.5, fontColor='whitesmoke', bgColor='#212121' }) => {
    
    const handleChange = e => onChange( e.target.value )

    return <TextInput
        type="text"
        value={value}
        onFocus={e => e.target.select()}
        onChange={handleChange}
        fontSize={fontSize}
        fontColor={fontColor}
        bgColor={bgColor}
        
    />
}

export default TextField;