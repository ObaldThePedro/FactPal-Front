import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import API from './adapters/API';

class App extends React.Component {

  state = {
    user: undefined
  }

  componentDidMount() {
    API.validateUser()
      .then(data => {
        if (data.error) {
          console.error(data.error)
          // display some error
          // this.props.history.push('/login')
        } else {
          this.setState({ user: data })
          // this.props.history.push('/dashboard')
        }
      })
  }

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
  }

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user }))
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined })
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} />
      </div>
    );
  }
}


export default App;