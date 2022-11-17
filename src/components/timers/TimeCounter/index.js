import { useState, useEffect, useRef } from 'react';
import {
    SECOND_MS, MINUTE_MS, HOUR_MS,
    MILLISECONDS_PRECICION,
    INTERVAL_DELAY,
    PROGRESS_HEIGHT, PROGRESS_DEFAULT_COLOR, PROGRESS_ACTIVE_COLOR, PROGRESS_COMPLETED_COLOR,

} from '../../../constants.js';
import IconButton from './IconButton'
import Settings from './Settings';
import TimeDisplay from './TimeDisplay';
import ProgressBar from '../../generic/ProgressBar'



///////////////////////////////////////////////////////////////
//
//  Generate an array of steps for use when stopwatch is running
// 
/** 
 * @param intervals Number of times to run through the timers
 * @param timers Array of timer objects (see constants) 
 * @returns Array of Step Objects
 */

const genSteps = (intervals, timers) => {
    let stepIndex = -1, from = 0, to = 0;
    return Array(intervals).fill(0).reduce((accum, intItem, intervalIndex) => {
        return accum.concat(
            timers.map((timerItem, timerIndex) => {
                stepIndex++;
                from = to + 1;
                to = from + timerItem.time - 1;
                return { index: stepIndex, intervalIndex, timerIndex, from, to, time: timerItem.time }
            })
        );
    }, []);
};


///////////////////////////////////////////////////////////////
//
//  Figure out which step the stopwatch is on
// 
/** 
 * @param steps Array of steps
 * @param time Number of milliseconds accumulated while stopwatch is running
 * @returns Step Object
 */

const getStep = ({ steps, time }) => steps.find(item => (time >= item.from && time <= item.to));


///////////////////////////////////////////////////////////////
//
//  Generate the default object with properties needed for the stopwatch to use for running
// 
/** 
 * @param intervals Number of times to run through the timers
 * @param timers Array of timer objects (see constants) 
 * @returns RUntime Object 
 */

const getRuntime = ({ intervals, timers }) => {
    const steps = genSteps(intervals, timers);
    return {
        intervalIndex: 0,
        timerIndex: 0,
        totalTimeAccrued: 0,
        totalTimeLimit: steps.at(-1).to,
        displayTime: 0,
        timerLimit: timers[0].time,
        lastUpdated: 0,
        ready: timers.find(item => item.time <= 0) ? false : true,
        active: false,
        paused: false,
        done: false,
        steps
    }
}



///////////////////////////////////////////////////////////////
//
//  Coverts time units into total milliseconds
// 
/** 
 * @param hours Number of hours
 * @param minutes Number of minutes
 * @param seconds Number of seconds
 * @returns Number of milliseconds
 */

const getTime = ({ hours = 0, minutes = 0, seconds = 0 }) => hours * HOUR_MS + minutes * MINUTE_MS + seconds * SECOND_MS;


///////////////////////////////////////////////////////////////
//
//  Generate TimeCounter default config
// 
/** 
 * @param title Number of hours
 * @param ascending Boolean for direction: true=ascending false=descending
 * @param intervals Number of times to run through the timers
 * @param timers Array of timer objects (see constants) 
 * @returns TimeCounter Configuration Object (settings prop)
 */

const initConfig = ({ title = '', ascending = true, intervals = 1, timers = [] }) => {
    timers = timers.map((timer, index) => ({
        index,
        ...timer,
        time: getTime(timer)
    }));
    return {
        title,
        ascending,
        intervals,
        timers,
        runtime: getRuntime({ intervals, timers })
    }
}



///////////////////////////////////////////////////////////////
//
//  Main: TimeCounter
// 
/** 
 * @param conf The TimeCounter specifications
 */

const TimeCounter = ({ conf }) => {
    // STATE: Main configuration, settings, and runtime info
    const [config, setConfig] = useState(initConfig(conf));

    // STATE: Settings toggle
    const [settings, setSettings] = useState(false);

    // REF: reference to the time interval
    const interval = useRef(null);


    /** 
     * SET: Updates a time unit in one of the timers
     * 
     * @param index Number index of the timer in the timers array
     * @param unit String of time unit prop name within a timer
     * @param value Number The value to set
     * 
     */
    const setTimer = ({ index, unit, value }) => {
        const timers = config.timers.map(
            (timer, timerIndex) =>
                timerIndex !== index ?
                    timer :
                    { ...timer, [unit]: value, time: getTime({ ...timer, [unit]: value }) }
        )
        setConfig({
            ...config,
            timers,
            runtime: getRuntime({ intervals: config.intervals, timers })
        });
    }


    /** 
     * SET: Intervals to run the array of timers
     * 
     * @param intervals Number of intervals
     * 
     */
    const setIntervals = (intervals) => setConfig({
        ...config,
        intervals,
        runtime: getRuntime({ intervals, timers: config.timers })
    });


    /** 
    * HANDLERS: Timer Hours, Minutes, and Seconds
    * 
    * @param index Number index of the timer in the timers array
    * @param value Number value to set for the given time unit
    * 
    */
    const setHours = ({ index, value }) => setTimer({ index, value, unit: 'hours' });
    const setMinutes = ({ index, value }) => setTimer({ index, value, unit: 'minutes' });
    const setSeconds = ({ index, value }) => setTimer({ index, value, unit: 'seconds' });
    const start = () => setConfig({
        ...config,
        runtime: {
            ...getRuntime({ intervals: config.intervals, timers: config.timers }),
            active: true,
            lastUpdated: new Date().getTime()
        }
    })

    /** 
     * HANDLERS: Stopwatch controls
     */
    const pause = () => setConfig({
        ...config,
        runtime: { ...config.runtime, paused: true }
    })
    const resume = () => setConfig({ ...config, runtime: { ...config.runtime, paused: false, lastUpdated: new Date().getTime() } })
    const rewind = () => setConfig({ ...config, runtime: getRuntime({ intervals: config.intervals, timers: config.timers }) })
    const forward = () => {
        const { intervals, ascending, timers, runtime: { steps } } = config;
        const lastTimerTimeAmount = timers.at(-1).time;
        setConfig({
            ...config,
            runtime: {
                ...config.runtime,
                intervalIndex: intervals - 1,  // Set the last interval's index as current
                timerIndex: timers.length - 1,  // Set the last timer in the array's index
                timerLimit: lastTimerTimeAmount, // Set the limit of the currenmt timer
                totalTimeAccrued: steps.at(-1).to, // set the time accrued to the time it should be accrued to when the least times ir completed
                displayTime: ascending ? lastTimerTimeAmount : 0, // Set the time to display on the counter
                lastUpdated: new Date().getTime(), // Set the last update time of this TimeCounter
                done: true, // Flag as completed
            }
        })
    }

    // EFFECT: Side-effect for changes in config state
    useEffect(() => {
        const { current } = interval;
        const { ascending, runtime: { ready, active, paused, done, totalTimeAccrued, lastUpdated, steps } } = config;

        // CLear the JS interval if it shouldn't be running
        if (current && (!ready || !active || paused || done)) {
            interval.current = clearInterval(interval.current);
            return;
        }

        // Start the JS interval if it should be running
        if (!current && ready && active && !paused && !done) {
            interval.current = setInterval(() => {
                const now = new Date().getTime();
                let accum = totalTimeAccrued + (now - lastUpdated); // Add the additional time to accumulation
                let step = getStep({ steps, time: accum }); // get current step
                let isDone = !step; // are we done?
                step = isDone ? steps.at(-1) : step; // if done, set to last step
                accum = isDone ? step.to : accum; // if done, set to last step end time
                const delta = accum - step.from;
                setConfig({
                    ...config,
                    runtime: {
                        ...config.runtime,
                        intervalIndex: step.intervalIndex,
                        timerIndex: step.timerIndex,
                        timerLimit: step.time,
                        totalTimeAccrued: accum,
                        displayTime: (ascending ? delta : step.time - delta) + 1,
                        lastUpdated: now,
                        done: isDone // has it been completed?
                    }
                })
            }, INTERVAL_DELAY);
        }

        // Clear the JS interval on cleanup
        return () => clearInterval(interval);
    }, [config])


    const { timers, intervals, runtime: { intervalIndex, displayTime, timerLimit, active, paused, done } } = config;

    return <div className='timer'>
        <div className='header'>
            <h2>{settings ? 'Settings' : config.title}</h2>
            <IconButton icon={settings ? 'x-lg' : 'gear'} onClick={() => { setSettings(!settings) }} />
        </div>

        <div className='screen'>

            <div className='settings' style={{ display: settings ? 'block' : 'none' }}>
                <form>
                    <Settings
                        timers={timers}
                        intervals={intervals}
                        setHours={setHours}
                        setMinutes={setMinutes}
                        setSeconds={setSeconds}
                        setIntervals={setIntervals}
                    />
                </form>
            </div>

            <div style={{ display: settings ? 'none' : 'block' }}>
                <TimeDisplay
                    time={displayTime}
                    active={active}
                    done={done}
                    msNumDigits={MILLISECONDS_PRECICION}
                    defaultColor={PROGRESS_DEFAULT_COLOR}
                    activeColor={PROGRESS_ACTIVE_COLOR}
                    doneColor={PROGRESS_COMPLETED_COLOR} />

                <ProgressBar
                    value={displayTime}
                    limit={timerLimit}
                    active={active}
                    done={done}
                    size={PROGRESS_HEIGHT}
                    defaultColor={PROGRESS_DEFAULT_COLOR}
                    activeColor={PROGRESS_ACTIVE_COLOR}
                    doneColor={PROGRESS_COMPLETED_COLOR}
                />
                <ProgressBar
                    segmented={true}
                    value={intervalIndex}
                    limit={intervals}
                    active={active}
                    done={done}
                    size={PROGRESS_HEIGHT}
                    defaultColor={PROGRESS_DEFAULT_COLOR}
                    activeColor={PROGRESS_ACTIVE_COLOR}
                    doneColor={PROGRESS_COMPLETED_COLOR}
                />

                <div className='controls'>
                    <IconButton icon='rewind' size={2.5} disabled={!active} onClick={rewind} />
                    <IconButton
                        icon={active && !paused && !done ? 'pause' : 'play'}
                        size={3}
                        disabled={done}
                        onClick={!active ? start : !paused ? pause : resume}
                    />
                    <IconButton icon='forward' size={2.5} disabled={!active || done} onClick={forward} />
                </div>

            </div>
        </div>
    </div>

}


export default TimeCounter;