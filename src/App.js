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
    savedFacts: []
  }

  componentDidMount() {
    API.validateUser()
      .then(data => {
        if (!data.user) {           
          window.history.pushState({}, "new state", "login");
          // display some error
          // this.props.history.push('/login')
        } else {
          this.setState({ user: data.user })
          window.history.pushState({}, "new state", "home");
          // this.props.history.push('/dashboard')
          API.fetchFacts().then(facts => this.setState({savedFacts: facts}))
        }}
      )
  }

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
      window.history.pushState({}, "new state", "home");
  }

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user }))
      window.history.pushState({}, "new state", "home");
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined })
    window.history.pushState({}, "new state", "login");
  }

  fetchFact = () => {
    fetch("http://numbersapi.com/random/trivia?json").then(resp => resp.json()).then(newFact => this.setState({newFacts: [newFact]}))
  }

  saveFact = (fact) => {
    fact.username = this.state.user.username
    this.setState({savedFacts: [fact, ...this.state.savedFacts]})
    this.setState({newFacts: []})
    //API.saveFact(fact)
  }

  likeFact = (fact) => {
    API.postLike(fact, this.state.user.id).then(this.setState({
      savedFacts: 
        this.state.savedFacts.map(mappedFact => {
          if(fact.id === mappedFact.id) {
            fact.get_likes++
            return fact
          }
          return mappedFact
        })
    }))
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} logOut={this.logOut} fetchFact={this.fetchFact}/>
        { this.state.user ?
        <div>
        <strong> Welcome to Factpal {this.state.user.username} ! </strong>
        <FactContainer newFacts={this.state.newFacts} savedFacts={this.state.savedFacts} newFact={this.fetchFact} saveFact={this.saveFact} likeFact={this.likeFact} /> 
        </div>: 
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