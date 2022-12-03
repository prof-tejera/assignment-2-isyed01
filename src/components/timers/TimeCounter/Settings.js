import styled from "styled-components";
import IntegerField from '../../generic/IntegerField';
import {
    MIN_INTERVALS_INPUT, MAX_INTERVALS_INPUT,
    MIN_HOURS_INPUT, MAX_HOURS_INPUT,
    MIN_MINUTES_INPUT, MAX_MINUTES_INPUT,
    MIN_SECONDS_INPUT, MAX_SECONDS_INPUT,
    INPUT_FONT_SIZE, INPUT_FONT_COLOR, INPUT_BG_COLOR,
} from '../../../constants';


const FieldContainer = styled.div`
    display:inline-block;
    padding:0.5rem 0.5rem;
    color:#cccccc;
`
const FieldLabel = styled.label`
    font-size: 1.125rem;
    display:block;
    color:#d0d0d0;
`
const InputWrapper = styled.div`
    display:inline-block;
    font-size: 1.5rem;
    font-weight:bold;
    background-color:#212121;
    border:solid 1px #cccccc;
    border-radius:0.25rem;
    margin-top:0.5rem;
`


///////////////////////////////////////////////////////////////
//
//  Main: Inputs to to change timer settings
// 
/** 
 * @param intervals String ID (prop name) pf the icon paths in SVG_ICON_PATHS
 * @param timers String ID (prop name) pf the icon paths in SVG_ICON_PATHS
 * @param setIntervals Function Handler to set intervals value
 * @param setHours Function Handler to set timer hours
 * @param setMinutes Function Handler to set timer minutes
 * @param setSeconds Function Handler to set timer seconds
 * @returns TimerSettings component
 */

const Settings = ({ intervals, timers, setIntervals, setHours, setMinutes, setSeconds }) =>
    <>
        {
            timers.map((item, index) =>
                <FieldContainer key={index}>
                    <FieldLabel>{item.label}</FieldLabel>
                    <InputWrapper>
                        <IntegerField
                            min={MIN_HOURS_INPUT}
                            max={MAX_HOURS_INPUT}
                            value={item.hours}
                            onChange={(value) => setHours({ index, value })}
                            fontSize={INPUT_FONT_SIZE}
                            fontColor={INPUT_FONT_COLOR}
                            bgColor={INPUT_BG_COLOR}
                        />
                        :
                        <IntegerField
                            min={MIN_MINUTES_INPUT}
                            max={MAX_MINUTES_INPUT}
                            value={item.minutes}
                            onChange={(value) => setMinutes({ index, value })}
                            fontSize={INPUT_FONT_SIZE}
                            fontColor={INPUT_FONT_COLOR}
                            bgColor={INPUT_BG_COLOR}
                        />
                        :
                        <IntegerField
                            min={MIN_SECONDS_INPUT}
                            max={MAX_SECONDS_INPUT}
                            value={item.seconds}
                            onChange={(value) => setSeconds({ index, value })}
                            fontSize={INPUT_FONT_SIZE}
                            fontColor={INPUT_FONT_COLOR}
                            bgColor={INPUT_BG_COLOR}
                        />
                    </InputWrapper>
                </FieldContainer>
            )
        }


        <FieldContainer>
            <FieldLabel>Intervals</FieldLabel>
            <InputWrapper>
                <IntegerField
                    min={MIN_INTERVALS_INPUT}
                    max={MAX_INTERVALS_INPUT}
                    value={intervals}
                    onChange={setIntervals}
                    fontSize={INPUT_FONT_SIZE}
                    fontColor={INPUT_FONT_COLOR}
                    bgColor={INPUT_BG_COLOR}
                />
            </InputWrapper>
        </FieldContainer>

    </>


export default Settings;