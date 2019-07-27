import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import API from './adapters/API';
import FactContainer from './containers/FactContainer';

class App extends React.Component {

  state = {
    user: undefined,
    newFacts: [],
    savedFacts: [{
      username: "Felix",
      text: "This is a fact"
    }]
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

  fetchFact = () => {
    fetch("http://numbersapi.com/random/trivia?json").then(resp => resp.json()).then(newFact => this.setState({newFacts: [newFact]}))
  }

  saveFact = (fact) => {
    fact.username = "Felix"
    this.setState({savedFacts: [fact, ...this.state.savedFacts]})
    this.setState({newFacts: []})
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} logOut={this.logOut} fetchFact={this.fetchFact}/>
        { this.state.user ? 
        <FactContainer newFacts={this.state.newFacts} savedFacts={this.state.savedFacts} newFact={this.fetchFact} saveFact={this.saveFact} /> : 
        <div>
          <img 
          src={require('./images/fact.jpg')}
          style={{width: 600, height: 600, position: 'relative', top: this.props.top, left: this.props.left}}
          />
          <LoginPage user={this.state.user} signUp={this.signUp} logIn={this.logIn} />
        </div>
        }
      </div>
    );
  }
}


export default App;