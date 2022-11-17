
import { SECOND_MS, MINUTE_MS, HOUR_MS } from '../constants'


// takes an object and 
export const toMS = ({ h=0, m=0, s=0, ms=0 }) => (HOUR_MS * h + MINUTE_MS * m + SECOND_MS * s) + ms;


// Takes a timestamp and return a unit-based object with short and long form keys
export const fromMS = (timestamp) => {

    let ms = timestamp;

    const hours = parseInt( ms / HOUR_MS );
    ms = ms % HOUR_MS;
    
    const minutes = parseInt( ms / MINUTE_MS );
    ms = ms % MINUTE_MS;
    
    const seconds = parseInt( ms / SECOND_MS );
    ms = ms % SECOND_MS;
    
    return { 
        // short form
        h:hours, 
        m:minutes, 
        s:seconds, 
        ms,
        ts:timestamp,
        // long form
        hours, 
        minutes, 
        seconds, 
        milliseconds: ms, 
        timestamp,
        // the input
    }
}


export const createTimeLookup = (activitiesList) => {
    // Get time of where the previous item in the list ended
    const getFrom = (list) => list.length === 0 ? 0 : list.at(-1).to;

    // get time of where last timer ended
    const getTo = () => timers.at(-1).to;

    const timerItem = ({ index, item, totalSiblings }) => {
        const length = toMS(item)
        const from = getFrom(timers);
        const to = from + length;
        const duration = fromMS(length)
        const position = { at:index+1, of: totalSiblings }
        return { index, from, to, length, duration, position }
    }

    const roundItem = ({ index, item, totalSiblings }) => {
        const from = getFrom(rounds);
        const to = getTo();
        const length = to - from;
        const duration = fromMS(length)
        const position = { at:index+1, of: totalSiblings }
        return { index, from, to, length, duration, position }
    }

    const activityItem = ({ index, item, totalSiblings }) => {
        const { id, name } = item;
        const from = getFrom(activities);
        const to = getTo();
        const length = to - from;
        const duration = fromMS(length)
        const position = { at:index+1, of: totalSiblings }
        return { index, id, name, from, to, length, duration, position, }
    }

    const numActivities = activitiesList.length;
    let numRounds = 1;
    let numTimers = 1;
    let activities = [];
    let rounds = [];
    let timers = [];
    activitiesList.forEach((activity, ai) => {
        numRounds = activity.rounds;
        Array(numRounds).fill(0).forEach((round, ri) => {
            numTimers = activity.timers.length;
            activity.timers.forEach((timer, ti) =>{
                timers.push( timerItem({ index:ti, item:timer, totalSiblings:numTimers }) )
            })
            rounds.push( roundItem({ index:ri, totalSiblings:numRounds }) )
        })
        activities.push( activityItem({ index:ai, item:activity, totalSiblings:numActivities })  );

    })
    return { activities, rounds, timers }
}


