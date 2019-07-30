import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import API from './adapters/API';
import FactContainer from './containers/FactContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
         API.fetchFacts().then(facts => facts.reverse()).then(facts => this.setState({savedFacts: facts}))
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

  postFact = (fact) => {
    API.postFact(fact, this.state.user.id).then(fact => {
      this.setState({savedFacts: [fact.fact, ...this.state.savedFacts]})
      this.setState({newFacts: []})
    })
  }
  
  handleLike = (fact, isLiked) => {
    if (isLiked) {
      const deleteID = fact.likes.find(like => like.user.id === this.state.user.id).id
      API.destroyLike(deleteID)
      return API.fetchFacts().then(facts => facts.reverse()).then(facts => this.setState({savedFacts: facts}))
      // return this.setState({
      //   savedFacts: 
      //     this.state.savedFacts.map(mappedFact => {
      //       if(fact.id === mappedFact.id) {
      //         fact.get_likes--
      //         return fact
      //       }
      //       return mappedFact
      //     })
      // })
    }
    API.postLike(fact, this.state.user.id)
    return API.fetchFacts().then(facts => facts.reverse()).then(facts => this.setState({savedFacts: facts}))
    // .then(like =>
    //   this.setState({
    //   savedFacts: 
    //     this.state.savedFacts.map(mappedFact => {
    //       if(fact.id === mappedFact.id) {
    //         fact.get_likes = like.like.newlikes
    //         return fact
    //       }
    //       return mappedFact
    //     })
    // }))
  }

  postComment = (comment, fact) => {
    API.postComment(comment.comment, fact.id, this.state.user.id)
    API.fetchFacts().then(facts => facts.reverse()).then(facts => this.setState({savedFacts: facts}))
  }

  render() {
    return (
      <div className="App">
        { this.state.user ?
        <>
        <Navbar user={this.state.user} logOut={this.logOut} fetchFact={this.fetchFact}/>
        <FactContainer currentUser={this.state.user} newFacts={this.state.newFacts} savedFacts={this.state.savedFacts} newFact={this.fetchFact} postFact={this.postFact} handleLike={this.handleLike} postComment={this.postComment}/> 
        </>
        : 
        <div>
          <LoginPage user={this.state.user} signUp={this.signUp} logIn={this.logIn} />
        </div>
        }
      </div>
    );
  }
}


export default App;