import React from 'react'

const Navbar = ({ user, signUp, logIn, logOut, fetchFact }) => {
    return (
        <div className="ui secondary  menu">
            {/* <a className="item">
                Home
            </a> */}


            {user ? <a className="item active" onClick={fetchFact}> Get to know an interesting new Fact! </a> : true}
            <div className="right menu">
                <div className="item">
                {/* <div className="ui icon input">
                    <input type="text" placeholder="Search..."/>
                    <i className="search link icon"></i>
                </div> */}
            </div>
                {user ? <a className="ui item" onClick={logOut}> Logout </a> : true}
            </div>
        </div>
        
    )
}

export default Navbar