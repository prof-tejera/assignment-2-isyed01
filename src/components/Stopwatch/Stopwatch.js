import { useEffect } from "react";
import { useApp } from "../../context/app";
import ActivityStatus from "./Status";
import Controls from "./Controls";
import './Stopwatch.css';

const Stopwatch = () => {
    const { isCounterActive, timeline, results, status, isRunning,  tick, reset, } = useApp();
    const handleTick = () => tick()
    useEffect(() => {
        isRunning() && setTimeout(handleTick, 100);
    }, [status])

    useEffect(() => {
        return () => { reset() }
    }, []);
    if (timeline.activities.length === 0) return '';
    if (!results) return '';
    if (!results.timer) return '';
    return <div className={`stopwatch ${results.timer.isRest ? 'resting' : ''}`}>
        {
            isCounterActive ? <ActivityStatus /> : ''
        }
        <Controls />
    </div>
}


export default Stopwatch;