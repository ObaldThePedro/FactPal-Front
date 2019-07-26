import React from 'react'

const Navbar = ({ user, signUp, logIn, logOut }) => {
    return (
        <div class="ui secondary  menu">
            <a class="item">
                Home
            </a>
            <a class="item">
                Messages
            </a>
            <a class="item active">
                Friends
            </a>
            <div class="right menu">
                <div class="item">
                <div class="ui icon input">
                    <input type="text" placeholder="Search..."/>
                    <i class="search link icon"></i>
                </div>
                </div>
                {!user ? <a class="ui item"> Logout </a> : true}
            </div>
        </div>
        
    )
}

export default Navbar