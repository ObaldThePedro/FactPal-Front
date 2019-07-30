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
          this.props.history.push('/login')
        } else {
          this.setState({ user: data.user })
          this.props.history.push('/home')
          this.displayFacts()
        }}
      )
  }

  displayFacts = () => API.fetchFacts().then(facts => facts.reverse()).then(reversedFacts => this.setState({savedFacts: reversedFacts}))

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user })).then(user => this.displayFacts())
      this.props.history.push('/home')
    }

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user })).then(user => this.displayFacts()).then(this.props.history.push('/home'))
      
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined })
    this.props.history.push('/login')
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
      return this.displayFacts()
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
    return this.displayFacts()
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
        <Route path={"/home"} render={props =>
        <div>
          <Navbar user={this.state.user} logOut={this.logOut} fetchFact={this.fetchFact}/>
          <FactContainer currentUser={this.state.user} newFacts={this.state.newFacts} savedFacts={this.state.savedFacts} newFact={this.fetchFact} postFact={this.postFact} handleLike={this.handleLike} postComment={this.postComment}/>
        </div>
        }/>
        <Route exact path={"/login"} component={props => <LoginPage user={this.state.user} signUp={this.signUp} logIn={this.logIn} />} />
      </div>
    );
  }
}


export default App;