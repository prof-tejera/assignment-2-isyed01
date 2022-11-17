import { createTimeline, queryTimeline } from "./utils/timelline";


export const initRoutinesState = [
    {
        index: 0, // dynamic
        id: 'workout', // dynamic
        name: 'Workout',
        activities: ['stopwatch', 'countdown', 'xy', 'tabata']
    }
]

export const initActivitiesState = [
    {
        id: 'stopwatch',
        name: 'Stopwatch',
        ascending: true,
        rounds: 1,
        timers: [{ h: 0, m: 0, s: 7 }]
    },
    {
        id: 'countdown',
        name: 'Countdown',
        ascending: false,
        rounds: 1,
        timers: [{ h: 0, m: 0, s: 6 }]
    }, {
        id: 'xy',
        name: 'XY',
        ascending: false,
        rounds: 2,
        timers: [{ h: 0, m: 0, s: 5 }]
    }, {
        id: 'tabata',
        name: 'Tabata',
        ascending: false,
        rounds: 3,
        timers: [{ h: 0, m: 0, s: 4 }, { h: 0, m: 0, s: 3 }]
    }
]

export const initTimelineState =  createTimeline({ activities:initActivitiesState, routine:initRoutinesState[0] })
export const initTimeState =  queryTimeline({ timeline:initTimelineState, accum:0 });

export const initStatus = {
    isPaused: true,
    isCompleted: false,
    lastUpdated: 0,
    accum: 0,
}


export const menuLinks = [
    { to: '/', label: 'Workout' },
    { to: '/docs', label: 'Documentation' },
  ]


// Stopwatch settings

export const DECIMAL_PRECISION = 2;