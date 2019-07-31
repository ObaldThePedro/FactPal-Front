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
    savedFacts: [],
    sortLike: false
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
      
      
      
      API.destroyLike(deleteID).then(message => this.displayFacts())
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
    } else {
    API.postLike(fact, this.state.user.id).then(this.displayFacts)
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
  }}

  postComment = (comment, fact) => {
    API.postComment(comment.comment, fact.id, this.state.user.id)
    API.fetchFacts().then(facts => facts.reverse()).then(facts => this.setState({savedFacts: facts}))
  }
  
  sortFacts = (factsArray) => {
    if (!this.state.sortLike) return factsArray
    return factsArray.slice().sort(function (factA, factB) {
      return factB.get_likes - factA.get_likes
    });
    }
  

  toggleLikeSort = () => {
    this.setState({
      sortLike: !this.state.sortLike
    })
  }

  render() {
    const facts = this.sortFacts(this.state.savedFacts)
    return (
      <div className="App">
        <Route path={"/home"} render={props =>
        <div>
          <Navbar user={this.state.user} logOut={this.logOut} fetchFact={this.fetchFact} toggleLike={this.toggleLikeSort} likeFilter={this.state.sortLike} />
          <FactContainer loading={!!this.state.user}currentUser={this.state.user} newFacts={this.state.newFacts} savedFacts={facts} newFact={this.fetchFact} postFact={this.postFact} handleLike={this.handleLike} postComment={this.postComment}/>
        </div>
        }/>
        <Route exact path={"/login"} component={props => <LoginPage user={this.state.user} signUp={this.signUp} logIn={this.logIn} />} />
      </div>
    );
  }
}


export default App;