import React from "react";

const getSide = (event, element) => {
    const mouseY = event.clientY - element.offsetTop;
    const centerY = element.offsetHeight / 2;
    return mouseY < centerY ? 'top' : 'bottom'
}



const ReorderableListItems = ({ items = [], handleUpdate, children }) => {
    let srcEl = null;
    let srcIndex = null;
    let targetEl = null;
    let targetIndex = null;
    let insertSide = null

    const handleDragStart = (event) => {
        srcEl = event.target;
        srcEl.classList.add("active");
        srcIndex = parseInt(event.target.dataset.index)
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', null);
    }

    const handleDragOver = (event) => {
        const prevEl = targetEl;
        targetEl = event.target.tagName.toLowerCase()==='li' ? event.target : event.target.parentNode;
        targetIndex = parseInt(targetEl.dataset.index);
        if (prevEl !== null && prevEl !== targetEl) {
            prevEl.classList.remove("over-top", "over-bottom");
        }
        if (targetEl !== null) {
            targetEl.classList.remove("over-top", "over-bottom");
            insertSide = getSide(event, targetEl);
            if (targetEl !== srcEl) targetEl.classList.add(`over-${insertSide}`);
        }
    }

    const handleDragEnd = (event) => {
        srcEl.classList.remove("active");
        targetEl.classList.remove("over-top", "over-bottom", "active");
        if (srcEl === targetEl) return;
        let insertAt = insertSide === "top" ? targetIndex - 1 : targetIndex;
        insertAt = insertAt < 0 ? 0 : insertAt;
        let arr = [...items];
        const item = arr.splice(srcIndex, 1)[0];
        arr.splice(insertAt, 0, item)
        handleUpdate(arr)
    }

    const MutatedChild = ({ component, index }) => 
        React.cloneElement( component, {
            'data-index':index,
            draggable:true,
            className:'',
            onDragStart:handleDragStart,
            onDragOver:handleDragOver,
            onDragEnd:handleDragEnd
        })

    return children.map(
        (child, index) => <MutatedChild key={index}  index={index} component={child} /> 
    )
}


export default ReorderableListItems;