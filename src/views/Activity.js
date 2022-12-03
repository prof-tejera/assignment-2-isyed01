import { useParams, useNavigate } from 'react-router-dom';
import FieldLabel from '../components/generic/FieldLabel';
import TextField from '../components/generic/TextField';
import IntegerField from '../components/generic/IntegerField';
import BooleanField from '../components/generic/BooleanField';
import TimeField from '../components/generic/TimeField';
import IconButton from "../components/IconButton";
import { useApp } from "../context/app";



const Activity = () => {
    const { activities, updateActivity } = useApp();
    const navigate = useNavigate();
    const { activityId } = useParams();
    const activity = activities.find(activity => activity.id === activityId)

    const handleName = (value) => updateActivity({ id: activityId, prop: 'name', value })
    const handleTime = (value) => {
        const timers = activity.timers.length === 1 ? [value] : [value, activity.timers[1]];
        updateActivity({ id: activityId, prop: 'timers', value: timers })
    }
    const handleRest = (value) => {
        const isZero = value.h === 0 && value.m === 0 && value.s === 0
        const timers = isZero ? [activity.timers[0]] : [activity.timers[0], value];
        updateActivity({ id: activityId, prop: 'timers', value: timers })
    }
    const handleRounds = (value) => updateActivity({ id: activityId, prop: 'rounds', value })
    const handleAscending = (value) => updateActivity({ id: activityId, prop: 'ascending', value })

    return !activity ? '' : <>
        <header>
            <div>
                <IconButton icon='arrow-left' onClick={() => navigate(-1)} />
                <h1>{activity.name}</h1>
            </div>
        </header>
        <main>
            <form style={{ maxWidth: '780', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', textAlign: 'left' }}>
                    <div>
                        <FieldLabel>Name</FieldLabel>
                        <TextField value={activity.name} onChange={handleName} />
                    </div>
                    <div>
                        <FieldLabel>Active Time</FieldLabel>
                        <TimeField value={activity.timers[0]} onChange={handleTime} />
                    </div>
                    <div>
                        <FieldLabel>Rest Time</FieldLabel>
                        <TimeField value={activity.timers[1] || { h: 0, m: 0, s: 0 }} onChange={handleRest} />
                    </div>

                    <div>
                        <FieldLabel>Rounds</FieldLabel>
                        <IntegerField min={1} max={99} value={activity.rounds} onChange={handleRounds} />
                    </div>
                    <div>
                        <FieldLabel>Count Direction</FieldLabel>
                        <BooleanField value={activity.ascending} trueText='Ascending' falseText='Descending' onChange={handleAscending} />
                    </div>
                </div>
            </form>
        </main>
    </>
}

export default Activity;