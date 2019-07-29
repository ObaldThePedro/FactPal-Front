const endpoint = 'http://localhost:3000/api/v1'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const postsUrl = `${endpoint}/posts`
const validateUrl = `${endpoint}/validate`

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        return Promise.resolve({error: 'no token'})
}

const handleServerError = response => console.error(response)

const signUp = (user) => fetch(signupUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)
    .then(data => {
        localStorage.setItem('token', data.token)
        return data.user
    })
    .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify).then(data => {
    localStorage.setItem('token', data.token)
    return data.user
})

const validateUser = () => {
    if(!localStorage.getItem('token')) return Promise.resolve({error: 'no token'})

    return fetch(validateUrl, {
        headers: {'Authorization': localStorage.getItem('token')}
    }).then(resp => resp.json())
        .then(data => {
            localStorage.setItem('token', data.token)
            return data
        })
        .catch(handleServerError)
}

const fetchFacts = () =>
    fetch('http://localhost:3000/api/v1/facts', {
    headers: {'Authorization': localStorage.getItem('token')}
    }).then(response => response.json())

const postLike = (fact, liker) => {
    return fetch(`http://localhost:3000/api/v1/likes`, {
    method: 'POST',
    headers: 
        {'Authorization': localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
    body: JSON.stringify({fact_id: fact.id, user_id: liker})
    }).then(response => response.json())
}


const postFact = (fact, poster) => {
    return fetch(`http://localhost:3000/api/v1/facts`, {
    method: 'POST',
    headers: 
        {'Authorization': localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
    body: JSON.stringify({text: fact.text, user_id: poster})
    }).then(response => response.json())
}

const clearToken = () => localStorage.removeItem('token')

const postComment = (text, fact, poster) => {
    return fetch(`http://localhost:3000/api/v1/comments`, {
    method: 'POST',
    headers: 
        {'Authorization': localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
    body: JSON.stringify({text: text, fact_id: fact, user_id: poster})
    }).then(response => response.json())
}

export default {
    signUp,
    logIn,
    validateUser,
    clearToken,
    fetchFacts,
    postLike,
    postFact,
    postComment
}