import React, { useContext, useState, useEffect, useRef } from 'react'
import { initRoutinesState, initActivitiesState, initTimelineState } from '../config';
import { createTimeline, queryTimeline } from "../utils/timelline";
import { initStatus } from '../config'

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [ isNavigationOpen, setIsNavigationOpen ] = useState(false);
    const [ isCounterActive, setCounterIsActive ] = useState(false);
    const toggleNavigation = () => setIsNavigationOpen(!isNavigationOpen);
    const toggleCounterActive = () => setCounterIsActive(!isCounterActive);


    const [ routines, setRoutines] = useState([...initRoutinesState]);
    const [ activities, setActivities] = useState([...initActivitiesState]);
    const [ routineIndex, setRoutineIndex] = useState(0);
    const [ timeline, setTimeline] = useState({ ...initTimelineState });
    const [ results, setResults ] = useState({ ...queryTimeline({ timeline, accum: 0 }) })
    const statusRef = useRef({ ...initStatus })
    const [ status, setStatus ] = useState(statusRef.current);

    /* Routine Activity list */

    const reorderRoutineActivities = (reorderedActivities) => {
        const routinesCopy = [...routines];
        const routine = routinesCopy[routineIndex];
        const activities = reorderedActivities.map(item => item.id);
        routine.activities = activities;
        setRoutines(routinesCopy);
    }

    const removeRoutineActivity = (index) => {
        const routinesCopy = [...routines]
        const routine = routinesCopy[routineIndex];
        let activities = [...routine.activities];
        activities.splice(index, 1)
        routine.activities = activities;
        setRoutines(routinesCopy);
    }

    /* Activity add selection */

    const addRoutineActivity = (activityId) => {
        const routinesCopy = [...routines];
        const routine = routinesCopy[routineIndex];
        routine.activities.push(activityId);
        setRoutines(routinesCopy);
    }

    /* used by Stopwatch */
    const isRunning = () => isCounterActive && !statusRef.current.isPaused && !statusRef.current.isCompleted;
    const isLastActivity = () => results.activity.index === results.activity.indexOf;
    const isCompleted = () => statusRef.current.isCompleted;
    

    const updateStatus = (updates) => {
        const value = { ...statusRef.current, ...updates };
        statusRef.current = value; // 1. update the ref
        setStatus(value); // 2. update state
    }
    const updatePosition = (state) => {
        setResults(queryTimeline({ timeline, accum: state.accum }))
        updateStatus(state);
    }
    const goto = (accum) => {
        setResults(queryTimeline({ timeline, accum }));
        updateStatus({ isPaused:true, isCompleted:false,  accum:parseInt(accum), lastUpdated:new Date().getTime() });        
    }

    const start = () => {
        setCounterIsActive(true)
        updateStatus({ isPaused: false, lastUpdated: new Date().getTime() });
    }
    const pause = () => updateStatus({ isPaused: true, });
    const reset = () => updatePosition({ ...initStatus });
    const cancel = () => {
        reset()
        setCounterIsActive(false)
    }

    const tick = () => {
        if (!isRunning()) return;
        const timeLimit = timeline.duration.timestamp;
        const lastUpdated = new Date().getTime();
        const delta = lastUpdated - status.lastUpdated;
        const totalAccum = status.accum + delta;
        const isCompleted = totalAccum >= timeLimit;
        const accum = isCompleted ? timeLimit : totalAccum;
        const isPaused = isCompleted ? true : status.isPaused;
        updatePosition({ isPaused, isCompleted, lastUpdated, accum })
    }


    
    const end = () => updatePosition({
        ...initStatus,
        isCompleted: true,
        accum: timeline.activities[results.activity.indexOf].to
    });
    /* 
        TODO: 
        - converge prev and next jumping
        - when prev is clicked and current activity is running, just go to beginning of that activity first

    */
    const prev = () => {
        const currentIndex = results.activity.index;
        const gotoIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        const activity = timeline.activities.find(item => item.index === gotoIndex);
        const accum = activity.from + .1;
        goto(accum)
    }
    const next = () => {
        const currentIndex = results.activity.index;
        const gotoIndex = currentIndex === results.activity.indexOf ? currentIndex : currentIndex + 1;
        const activity = timeline.activities.find(item => item.index === gotoIndex);
        const accum = activity.from + .1;
        goto(accum)
    }

    useEffect(() => {
        setTimeline( createTimeline({ activities, routine: routines[routineIndex] }));
    }, [routines, activities, routineIndex])
    useEffect(() => {
        setResults(queryTimeline({ timeline, accum: 0 }))
    }, [timeline])
    return (
        <AppContext.Provider value={{ 
            isNavigationOpen, setIsNavigationOpen, toggleNavigation,
            isCounterActive, setCounterIsActive, toggleCounterActive,
            routines, updateRoutines: setRoutines,
            activities, updateActivities: setActivities, reorderRoutineActivities, removeRoutineActivity, addRoutineActivity,
            routineIndex, switchRoutine: setRoutineIndex,
            timeline, 
            results, setResults, statusRef, status, setStatus, updateStatus, 
            isRunning, isLastActivity, isCompleted, updatePosition, 
            start, pause, goto, tick, prev, next, reset, end, cancel,
        }}>
             {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const {
        isNavigationOpen, setIsNavigationOpen, toggleNavigation,
        isCounterActive, setCounterIsActive, toggleCounterActive,
        routines,
        updateRoutines,
        activities,
        updateActivities, reorderRoutineActivities, removeRoutineActivity, addRoutineActivity,
        routineIndex,
        switchRoutine,
        timeline, 
        results, setResults, statusRef, status, setStatus, updateStatus, isRunning, isLastActivity, isCompleted, updatePosition, start, pause, goto, tick, prev, next, reset, end, cancel,
    } = useContext(AppContext)
    return {
        isNavigationOpen, setIsNavigationOpen, toggleNavigation,
        isCounterActive, setCounterIsActive, toggleCounterActive,
        routines,
        updateRoutines,
        activities,
        updateActivities, reorderRoutineActivities, removeRoutineActivity, addRoutineActivity,
        routineIndex,
        switchRoutine,
        timeline, 
        results, setResults, statusRef, status, setStatus, updateStatus, isRunning, isLastActivity, isCompleted, updatePosition, start, pause, goto, tick, prev, next, reset, end, cancel,
    };
}

