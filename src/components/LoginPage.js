import React from 'react'
import UserForm from './UserForm'

const LoginPage = ({ user, signUp, logIn, logOut }) => {
    return (
        <>
        <img 
        src={require('../images/fact.jpg')}
        style={{width: 600, height: 600, position: 'relative'}}
        />
        <nav>
            {
                <>
                    <UserForm submit={signUp} header={'Sign up'} />
                    <br></br>
                    <UserForm submit={logIn} header={'Log in'} />
                </>
            }
        </nav>
        </>
    )
}

export default LoginPage