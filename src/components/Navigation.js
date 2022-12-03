import { NavLink } from "react-router-dom";
import { useApp } from '../context/app'
import { menuLinks } from "../config";


const Navigation = () => {
 const { isNavigationOpen, toggleNavigation} = useApp();

  const handleClick = (event) => {
    const tag = event.target.tagName.toLowerCase();
    if (tag==="a" || tag==="aside"){
      toggleNavigation();
    }
  }

  return <>
    <aside className={isNavigationOpen ? 'menu' : 'menu hide'} onClick={handleClick}>
      <nav>
        <ul>
          {
            menuLinks.map(( item, index )=>(

              <NavLink 
                key={index} 
                to={item.to} 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </NavLink>

            ))
          }
        </ul>
      </nav>
    </aside>
  </>
};


export default Navigation;