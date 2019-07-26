import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import API from './adapters/API';
import FactContainer from './containers/FactContainer';

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
    debugger
    API.signUp(user)
      .then(user => this.setState({ user }))
  }

  logIn = user => {
    debugger
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
        <Navbar/>
        { this.state.user ? <FactContainer/> : 
        <div>
          <img 
          src={require('./images/fact.jpg')}
          style={{width: 600, height: 600, position: 'relative', top: this.props.top, left: this.props.left}}
          />
          <LoginPage user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} />
        </div>
        }
      </div>
    );
  }
}


export default App;