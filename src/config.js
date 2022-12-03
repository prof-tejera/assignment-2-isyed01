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
        timers: [{ h: 0, m: 2, s: 30 }]
    },
    {
        id: 'countdown',
        name: 'Countdown',
        ascending: false,
        rounds: 1,
        timers: [{ h: 0, m: 2, s: 30 }]
    }, {
        id: 'xy',
        name: 'XY',
        ascending: false,
        rounds: 10,
        timers: [{ h: 0, m: 1, s: 10 }]
    }, {
        id: 'tabata',
        name: 'Tabata',
        ascending: false,
        rounds: 8,
        timers: [{ h: 0, m: 0, s: 20 }, { h: 0, m: 0, s: 10 }]
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