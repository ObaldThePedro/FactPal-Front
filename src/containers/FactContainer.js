import React from 'react'
import Fact from '../components/Fact';

class FactContainer extends React.Component {
    
    render(){
        debugger
        return(
            <>
                <strong> Welcome to Factpal {this.props.currentUser.username} ! </strong>
                {this.props.newFacts.map(fact => <Fact key={fact.id} newFact={true} fact={fact} newFact={this.props.newFact} postFact={this.props.postFact} />)}
                {this.props.savedFacts.map(fact => <Fact key={fact.id} currentUser={this.props.currentUser} newFact={false} fact={fact} handleLike={this.props.handleLike} postComment={this.props.postComment}/>)}
            </>
        )
    }
    

}

export default FactContainer