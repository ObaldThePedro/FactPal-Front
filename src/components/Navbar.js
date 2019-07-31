import React from 'react'

const Navbar = ({ logOut, fetchFact, toggleLike, likeFilter }) => {
    return (
        <div className="ui inverted  menu">
            <a className="ui item" onClick={fetchFact}> Get to know an interesting new Fact! </a>
            <a className="ui item" onClick={toggleLike}> {!likeFilter ? "Sort by Likes" : "Sort by newest"} </a>

            <div className="right menu">
               <a className="ui item" onClick={logOut}> Logout </a>
            </div>
        </div>
        
    )
}

export default Navbar