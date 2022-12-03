
import { fromMS, toMS } from './helpers'


const getRoutineActivities = ({ routine, activities }) =>
    routine.activities.map(id =>
        activities.find(activity => activity.id === id)
    )

///////////////////////////////////////////
// Build the virtual tree structure

const createTimerHneierarchy = ({ timers }) => 
    timers.map((timer, index)=>({
        index,
        indexOf:timers.length-1,
        isRest:index === 1,
        duration: toMS(timer),
    }))

const createRoundHneierarchy = ({ rounds, timers }) => 
    Array(rounds).fill(0).map((round, index)=>({
        index,
        indexOf:rounds-1,
        timers: createTimerHneierarchy({ timers })
    }))

const createActivityHneierarchy = ({ activities }) =>
    activities.map((activity, index) => ({
        ...activity,
        index,
        indexOf:activities.length-1,
        rounds: createRoundHneierarchy({ rounds: activity.rounds, timers: activity.timers })
    }))

const createHRoutineierarchy = ({ routine, activities }) => ({
    ...routine,
    activities: createActivityHneierarchy({
        activities: getRoutineActivities({ routine, activities })
    })
})



///////////////////////////////////////////
// load up the time stamps everywhere

export const createTimeline = ({ activities:srcActivities, routine }) => {
    const hierarchy = createHRoutineierarchy({ activities:srcActivities, routine })
    let activityFrom = 0;
    let roundFrom = 0;
    let timerFrom = 0;
    let to = 0;
    const activities = hierarchy.activities.map((activity)=>{
        activityFrom = to;
        const rounds = activity.rounds.map((round)=>{ 
            roundFrom = to;
            const timers = round.timers.map((timer)=>{  
                timerFrom = to;
                to = to+timer.duration;
                return { ...timer, from:timerFrom, to }
            })
            return { ...round, from:roundFrom, to, duration:to-roundFrom, timers }
        })
        return { ...activity, from:activityFrom, to, duration:fromMS(to-activityFrom), rounds }
    })
    return { ...hierarchy, from:0, to, duration:fromMS(to), activities }
}



///////////////////////////////////////////
// load up the time stamps everywhere


const formatPercent = (num) => (num * 100).toFixed(2) 

const getContextualTime = ({ from, to, accum }) => {
    const duration = to - from;
    const remaining = to - accum;
    const completed = duration - remaining;
    const percent = formatPercent( accum > 0 ? completed / duration : 0 );
    return { duration, completed, remaining, percent  }
}

const timerQueryResult = ({ timer, ascending, accum }) => {
    const { from, to, isRest } = timer;
    const { duration, completed, remaining, percent } = getContextualTime({ from, to, accum });
    const time = fromMS(ascending ? completed : remaining ); // time to display
    return { isRest, time, duration:fromMS(duration), percent }
}

const roundQueryResult = ({ round  }) => {
    const { index, indexOf } = round;
    return { index, indexOf }
}

const activityQueryResult = ({ activity, accum  }) => {
    const { name, id, index, indexOf, from, to, } = activity;
    const { percent } = getContextualTime({ from, to, accum });
    return { name, id, index, indexOf, from, to, percent }
}

const routineQueryResult = ({ routine, accum  }) => {
    const { name, id, from, to } = routine;
    const { percent } = getContextualTime({ from, to, accum });
    return { name, id, percent }
}

const queryFirstInRange = (array, accum) => 
    array.filter(item => accum >= item.from && accum <= item.to ).at(-1)


// export: queryTimeline

export const queryTimeline = ({ timeline, accum=0 }) => {
    // 1. get matching records
    // Note: query may come in with a decimal point to help with getting 
    //      next items in the sequence

    if(timeline.activities.length===0) return null;

    const activity = queryFirstInRange( timeline.activities, accum ) 
    const round = queryFirstInRange( activity.rounds, accum )
    const timer = queryFirstInRange( round.timers, accum )
    const { ascending } = activity;
    // massage the data

    const accumInt = parseInt(accum)

    return {
        routine: routineQueryResult({ routine:timeline, accum:accumInt }),
        activity: activityQueryResult({ activity, accum:accumInt }),
        round: roundQueryResult({ round }),
        timer: timerQueryResult({ timer, ascending, accum:accumInt }),
    }
}


///////////////////////////////////////////
// Export

const Timeline = { 
    createTimeline, 
    queryTimeline, 
}

export default Timeline