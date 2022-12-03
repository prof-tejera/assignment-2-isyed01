import { useApp } from "../../context/app";
import IconButton from "../IconButton";

const Controls = () => {
    const { isCounterActive, status, isRunning, isLastActivity, isCompleted, start, pause, prev, next, reset, end, } = useApp();
    const handleStart = () => start()
    const handleReset = () => reset()
    const handlePause = () => pause();
    const handleEnd = () => end();
    const handlePrev = () => prev()
    const handleNext = () => next()
    return <>
        <div className='time-controls'>
            <IconButton icon='skip-backward' onClick={handleReset} disabled={!isCounterActive || status.accum === 0} />
            <IconButton icon='rewind' onClick={handlePrev} disabled={!isCounterActive || status.accum === 0} />
            {
                isRunning() ?
                    <IconButton icon='pause' onClick={handlePause} /> :
                    <IconButton icon='play' onClick={handleStart} />
                    
            }
            <IconButton icon='forward' onClick={handleNext} disabled={!isCounterActive || isLastActivity()} />
            <IconButton icon='skip-forward' onClick={handleEnd} disabled={!isCounterActive || isCompleted()} />
        </div>
        </>
}


export default Controls;