import { useApp } from "../../context/app";
import IconButton from "../IconButton";
import { ProgressLine, ProgressBar, SegmentedProgressBar } from '../generic/ProgressBar'
import DisplayTime from "./DisplayTime/DisplayTime";


const Status = () => {
    const { results, cancel, isCompleted } = useApp();
    const handleCancel = () => cancel()
    return <>
        <ProgressLine percent={results.routine.percent} />
        <div className='hidden-toolbar'>
            <div className='active-font' style={{ visibility: results.timer.isRest && !isCompleted() ? 'visible' :'hidden' }}>Resting...</div>
            <div>
                <IconButton icon='x-lg' onClick={handleCancel} />
            </div>
        </div>
        <h2 className='activity-title active-font'>
            {results.activity.name}
        </h2>
        <div className='time-status'>
            <DisplayTime time={results.timer.time} />
            <ProgressBar percent={results.timer.percent} />
            <div style={{ paddingTop: '2rem', paddingBottom: '2rem', visibility: results.round.indexOf > 0 ? 'visible' : 'hidden' }}>
                <SegmentedProgressBar index={results.round.index} total={results.round.indexOf + 1} />
            </div>
        </div>
    </>
}

export default Status;