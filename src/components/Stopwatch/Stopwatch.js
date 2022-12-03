import { useEffect } from "react";
import { useApp } from "../../context/app";
import ActivityStatus from "./Status";
import Controls from "./Controls";
import './Stopwatch.css';


let handleReset;
let checkIfRunning;

const Stopwatch = () => {
    const { isCounterActive, timeline, results, status, isRunning,  isCompleted, tick, reset, } = useApp();
   
    handleReset = () =>  reset() 
    checkIfRunning = () => isRunning

    useEffect(() => {
        checkIfRunning() && setTimeout(tick, 100);
    }, [status, tick])

    useEffect(() => {
        return handleReset
    }, []);

    if (timeline.activities.length === 0) return '';
    if (!results) return '';
    if (!results.timer) return '';
    return <div className={`stopwatch ${ isCompleted() ? 'completed' : results.timer.isRest ? 'resting' : ''}`}>
        {
            isCounterActive ? <ActivityStatus /> : ''
        }
        <Controls />
    </div>
}


export default Stopwatch;