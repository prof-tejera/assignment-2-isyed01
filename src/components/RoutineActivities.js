import { useNavigate } from "react-router-dom";
import { useApp } from "../context/app";

import SVGIcon from "./SVGIcon";
import IconButton from "./IconButton";
import ReorderableListItems from './ReorderableListItems'

const RoutineActivities = () => {
    const { timeline, reorderRoutineActivities, removeRoutineActivity } = useApp();
    const navigate = useNavigate()
    const handleReorderActivities = (reorderedActivities) => reorderRoutineActivities(reorderedActivities)
    const handleRemoveActivity = (index) => removeRoutineActivity(index)
    const handleActivityDetails = (id) => navigate(`/activity/${id}`)
    return <>

        <div className='panel'>
            <div className='panel-header'>
                <h2>Activities ({timeline.activities.length})</h2>
                <div>
                    {timeline.duration.hours > 0 ? `${timeline.duration.hours}h` : ''}
                    &nbsp;
                    {`${timeline.duration.minutes}m`}
                    &nbsp;
                    {`${timeline.duration.seconds}s`}
                </div>
                <div>
                    <IconButton icon='plus-lg' onClick={() => navigate('/add')} />
                </div>
            </div>
            <ul className='list'>
                <ReorderableListItems items={timeline.activities} handleUpdate={handleReorderActivities}>
                    {
                        timeline.activities.map((item, index) =>
                            <li key={index} id={item.id}>
                                <div>
                                    <SVGIcon icon='list' className='list-icon sm' />
                                </div>
                                <div className='main' onClick={()=>handleActivityDetails(item.id)}>
                                    <h3>{item.name}</h3>
                                </div>
                                <div>
                                    <small>
                                        {item.duration.hours > 0 ? `${item.duration.hours}h` : ''}
                                        &nbsp;
                                        {`${item.duration.minutes}m`}
                                        &nbsp;
                                        {`${item.duration.seconds}s`}
                                    </small>
                                </div>
                                <div>
                                    <IconButton icon='dash-circle' onClick={(event) => { handleRemoveActivity(index) }} />
                                </div>
                            </li>
                        )
                    }
                </ReorderableListItems>
            </ul>
        </div>
    </>
}





export default RoutineActivities;