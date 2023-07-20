import React from "react";

const Header = (props: {resetDefaultTable: () => void}) => {

    return (
        <div className='HeaderContainer'>
            <h1 className='headerTitle'>Near-Earth Object Overview</h1>
            <button className="headerContainerClearBtn"
            onClick={props.resetDefaultTable}>
                Clear Filters and Sorters
            </button>
      </div>
    )
}

export default Header