import React, { useState } from 'react'

const SignupForm = ({ submit, header }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form onSubmit={e => {
            e.preventDefault();
            submit({ email, password })
            setEmail('')
            setPassword('')
        }}>
            <span>{header}</span>
            <input placeholder="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="submit" />
        </form>
    )
}

export default SignupForm