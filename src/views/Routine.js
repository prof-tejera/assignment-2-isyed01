

import { useApp } from "../context/app";
import Stopwatch from "../components/Stopwatch/Stopwatch";
import RoutineActivities from "../components/RoutineActivities";
import IconButton from "../components/IconButton";

const Workout = () => {
    const { toggleNavigation, isCounterActive } = useApp();
    return <>
        <header>
            <div>
                <IconButton icon='list' onClick={toggleNavigation} />
                <h1>Workout</h1>
            </div>
        </header>
        <main>
            { isCounterActive ? '' : <RoutineActivities /> }
            <Stopwatch  />
        </main>
    </>
}
export default Workout;