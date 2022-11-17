///////////////////////////////////////////////////////////////
//
//  Timer variables
//

// Time Units in MS
export const MILLISECOND = 1;
export const SECOND_MS = MILLISECOND * 1000;
export const MINUTE_MS = SECOND_MS * 60;
export const HOUR_MS = MINUTE_MS * 60;

// Interval delay in milliseconds
export const INTERVAL_DELAY = 10;

// How many digits to show for milliseconds (0=SS, 1=SS.1, 2=SS.01, 3=SS.001)
export const MILLISECONDS_PRECICION = 2;

// Input value range constraints
export const MIN_INTERVALS_INPUT = 1;
export const MAX_INTERVALS_INPUT = 10;
export const MIN_HOURS_INPUT = 0;
export const MAX_HOURS_INPUT = 23;
export const MIN_MINUTES_INPUT = 0;
export const MAX_MINUTES_INPUT = 59;
export const MIN_SECONDS_INPUT = 0;
export const MAX_SECONDS_INPUT = 59;



////////////////////////////////////////////////////////////////////////
//
//  Clock Configurations
// 
/*

@ascending: boolean = The count direction: true=ascending false=descending
@intervals: number = How many iterations will the times cycle through?
@timers: object[] =  The timers used for each interval
    @id: string =  A reference ID used for the timer
    @label: string =  The label of the input field and interval
    @hours: number = Number of hours (supports 0-23)
    @minutes: number = Number of minutes (supports 0-59)
    @seconds: number = Number of seconds (supports 0-59)
*/

export const CONFIG_STOPWATCH = {
    title: 'Stopwatch',
    ascending: true,
    intervals: 1,
    timers: [
        { id: 't1', label: 'Time', hours: 0, minutes: 2, seconds: 30 },
    ]
}
export const CONFIG_COUNTDOWN = {
    title: 'Countdown',
    ascending: false,
    intervals: 1,
    timers: [
        { id: 't1', label: 'Timer', hours: 0, minutes: 2, seconds: 30 },
    ]
}
export const CONFIG_XY = {
    title: 'XY',
    ascending: false,
    intervals: 10,
    timers: [
        { id: 't1', label: 'Timer 1', hours: 0, minutes: 1, seconds: 10 },
    ]
}
export const CONFIG_TABATA = {
    title: 'Tabata',
    ascending: false,
    intervals: 8,
    timers: [
        { id: 't1', label: 'Timer 1', hours: 0, minutes: 0, seconds: 20 },
        { id: 't2', label: 'Timer 2', hours: 0, minutes: 0, seconds: 10 }
    ]
}


///////////////////////////////////////////////////////////////
//
//  SVG Icons - Paths extracted from bootstrap icons
//


// Default size of an icon (in rems)
export const SVG_ICON_DEFAULT_SIZE = 2;


// Paths for icons
export const SVG_ICON_PATHS = {
    "arrow-left": ["M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"],
    "dash": ["M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"],
    "dash-lg": ["M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"],
    "dash-circle": [
        "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z",
        "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z",
    ],
    "plus": ["M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"],
    "plus-lg": ["M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"],
    "plus-circle": [
        "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z",
        "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z",

    ],
    "list": ["M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"],
    "rewind": ["M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z"],
    "skip-backward": ["M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"],
    "pause": ["M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"],
    "play": ["M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"],
    "forward": ["M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z"],
    "skip-forward": ["M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"],
    "gear": [
        "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z",
        "M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
    ],
    "x": ["M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"],
    "x-lg": ["M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"],
    "x-circle": [
        "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z",
        "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
    ],
    "stopwatch": [
        "M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z",
        "M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
    ],
    "stopwatch-fill": ["M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z"],
}


///////////////////////////////////////////////////////////////
//
//  CSS Properties 
//

// Progress bar
export const PROGRESS_HEIGHT = 0.5 // in rems
export const PROGRESS_DEFAULT_COLOR = '#434343'
export const PROGRESS_ACTIVE_COLOR = '#53F0EA'
export const PROGRESS_COMPLETED_COLOR = '#098682'

// Input fields

export const INPUT_FONT_SIZE = 1.5 // in rems
export const INPUT_FONT_COLOR = 'whitesmoke'
export const INPUT_BG_COLOR = 'rgba(33,33,33,1)';





////////////////////////////////////////////////////////////////////////
//
//  Clock Configurations
// 
/*

@ascending: boolean = The count direction: true=ascending false=descending
@intervals: number = How many iterations will the times cycle through?
@timers: object[] =  The timers used for each interval
    @id: string =  A reference ID used for the timer
    @label: string =  The label of the input field and interval
    @hours: number = Number of hours (supports 0-23)
    @minutes: number = Number of minutes (supports 0-59)
    @seconds: number = Number of seconds (supports 0-59)
*/


export const CONFIG_TIMERS = [
    {
        id: 'stopwatch',
        name: 'Stopwatch',
        ascending: true,
        intervals: 1,
        time: {
            active: { hours: 0, minutes: 2, seconds: 30, ms: 0 },
            rest: { hours: 0, minutes: 0, seconds: 0, ms: 0 },
            aggregate: { hours: 0, minutes: 2, seconds: 30, ms: 0 },
        },

        // OLD
        timers: [
            { label: 'Time', hours: 0, minutes: 2, seconds: 30 },
        ],

    },
    {
        id: 'countdown',
        name: 'Countdown',
        ascending: false,
        intervals: 1,
        timers: [
            { label: 'Timer', hours: 0, minutes: 2, seconds: 30 },
        ]
    },
    {
        id: 'xy',
        name: 'XY',
        ascending: false,
        intervals: 10,
        timers: [
            { label: 'Timer 1', hours: 0, minutes: 1, seconds: 10 },
        ]
    },
    {
        id: 'tabata',
        name: 'Tabata',
        ascending: false,
        intervals: 8,
        timers: [
            { label: 'Timer 1', hours: 0, minutes: 0, seconds: 20 },
            { label: 'Timer 2', hours: 0, minutes: 0, seconds: 10 }
        ]
    }
];
