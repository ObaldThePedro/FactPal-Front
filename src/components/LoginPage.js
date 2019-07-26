import React from 'react'
import UserForm from './UserForm'

const LoginPage = ({ user, signUp, logIn, logOut }) => {
    return (
        <nav>
            {
                <>
                    <UserForm submit={signUp} header={'Sign up'} />
                    <br></br>
                    <UserForm submit={logIn} header={'Log in'} />
                </>
            }
        </nav>
    )
}

export default LoginPage