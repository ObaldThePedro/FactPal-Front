import React from 'react'
import UserForm from './UserForm'

const LoginPage = ({ user, signUp, logIn, logOut }) => {
    return (
        <nav>
            {
                // user ? <div><button onClick={logOut}>Log out</button></div> :
                    <>
                        <UserForm submit={signUp} header={'Sign up'} />
                        or
                        <UserForm submit={logIn} header={'Log in'} />
                    </>
            }
        </nav>
    )
}

export default LoginPage