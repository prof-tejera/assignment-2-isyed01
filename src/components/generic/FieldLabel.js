import styled from "styled-components";


const Label = styled.div.attrs(
    props => ({
        style: {
            fontSize:       `${ props.fontSize }rem` || '1.5rem',
            height:         `${ props.fontSize * 1.125 }rem` || `1.75rem`,
            padding:        `${ props.fontSize * 0.5 }rem` || `0.25rem`,
            paddingBottom:  `${ props.fontSize * 0.1 }rem` || `0.25rem`,
            margin:         `${ props.fontSize * 0.5 }rem` || `0.35rem`,
            marginBottom:   `-${ props.fontSize * 0.5 }rem` || `0.35rem`,
            color:          props.fontColor || 'whitesmoke',
        },
    }))`
    text-align:left;
    border:none;

`

const FieldLabel = ({ children, fontSize=1, fontColor='whitesmoke', bgColor='transparemt' }) => {
   return <Label
        fontSize={fontSize}
        fontColor={fontColor}
        bgColor={bgColor}
        
    >{children}</Label>
}

export default FieldLabel;