import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoRouteMatch = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/')

  })
  return <h1>No Match</h1>;
};

export default NoRouteMatch;
