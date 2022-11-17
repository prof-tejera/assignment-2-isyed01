import SVGIcon from './SVGIcon';
import { SVG_ICON_DEFAULT_SIZE } from '../constants'


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

const IconButton = ({ icon, size='css', disabled=false, onClick }) => 
    <button type="button" disabled={disabled}  onClick={onClick}>
        <SVGIcon icon={icon} size={size} />
    </button>

export default IconButton;