import React from 'react'

const Navbar = ({ user, signUp, logIn, logOut, fetchFact }) => {
    return (
        <div className="ui inverted  menu">
            <a className="ui item" onClick={fetchFact}> Get to know an interesting new Fact! </a>

            <div className="right menu">
               <a className="ui item" onClick={logOut}> Logout </a>
            </div>
        </div>
        
    )
}

export default Navbar