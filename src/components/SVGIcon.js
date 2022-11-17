import { SVG_ICON_PATHS } from '../constants'

///////////////////////////////////////////////////////////////
//
//  Main: SVG Icon
// 
/** 
 * @param icon String ID (prop name) pf the icon paths in SVG_ICON_PATHS
 * @param size Number of rems to set the icon height (defaults to SVG_ICON_DEFAULT_SIZE)
 * @returns IconButton component
 */

const SVGIcon = ({ icon, className='' }) => 
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 16 16" >
        { 
            SVG_ICON_PATHS[icon].map(
                (path, index) => 
                    <path d={path} key={index} />
            ) 
        }
    </svg>


export default SVGIcon;