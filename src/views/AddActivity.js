import { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/app";

import SVGIcon from "../components/SVGIcon";
import IconButton from "../components/IconButton";

const AddTimer = () => {
    const { addRoutineActivity, activities } = useApp();
    const [ added, setAdded ] = useState(false);
    const navigate = useNavigate();
    
    const handleAddActivity = (activityId) => {
        addRoutineActivity(activityId)
        setAdded(true)
    }

    useEffect(()=>{
        if(added) navigate("/");
    },[added,navigate])

    return <>

        <header>
            <div>
                <IconButton icon='arrow-left' onClick={() => navigate('/')} />
                <h1>Add</h1>
            </div>
        </header>

        <main>
            <ul className='list'>
                    {
                        activities.map((item, index) =>
                            <li key={index} id={item.id} >
                                <div>
                                    <SVGIcon icon='stopwatch' className='list-icon sm' />
                                </div>
                                <div className='main'>
                                    <h3>{item.name}</h3>
                                </div>
                                <div>
                                    <IconButton icon='plus-circle' onClick={(event) => { handleAddActivity(item.id) }} />
                                </div>
                            </li>
                        )
                    }
            </ul>
        </main>
    </>
}


export default AddTimer;