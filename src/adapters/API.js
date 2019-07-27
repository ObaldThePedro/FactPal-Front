const endpoint = 'http://localhost:3000/api'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const factsUrl = `${endpoint}/facts`
const validateUrl = `${endpoint}/profile`

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        throw new Error(res.json())
}
const handleServerError = response => console.error(response)

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const signUp = (user) => fetch(signupUrl, {
    method: 'POST',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)
    // .then(data => {
    //     localStorage.setItem('token', data.token)
    //     return data.user
    // })
    // .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(data => {
            localStorage.setItem('token', data.token)
            return data.user
        })
        .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

export default {
    signUp,
    logIn,
    validateUser,
    clearToken
}