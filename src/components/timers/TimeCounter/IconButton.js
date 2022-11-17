import { SVG_ICON_DEFAULT_SIZE, SVG_ICON_PATHS } from '../../../constants'


///////////////////////////////////////////////////////////////
//
//  Main: Button with an embedded icon
// 
/** 
 * @param icon String ID (prop name) pf the icon paths in SVG_ICON_PATHS
 * @param size Number of rems to set the icon height (defaults to SVG_ICON_DEFAULT_SIZE)
 * @param disabled Boolean of whether to show the button disabled
 * @param onClick Function handler for the click event
 * @returns IconButton component
 */

const IconButton = ({ icon, size=SVG_ICON_DEFAULT_SIZE, disabled=false, onClick }) => 
    <button type="button"  disabled={disabled}  onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{  height: `${size}rem` }} viewBox="0 0 16 16" >
            { SVG_ICON_PATHS[icon].map((path, index) => <path d={path} key={index} />) }
        </svg>
    </button>

export default IconButton;