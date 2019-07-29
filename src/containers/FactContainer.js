import React from 'react'
import Fact from '../components/Fact';

class FactContainer extends React.Component {
    
    render(){
        return(
            <>
                {this.props.newFacts.map(fact => <Fact key={fact.id} newFact={true} fact={fact} newFact={this.props.newFact} postFact={this.props.postFact} />)}
                {this.props.savedFacts.map(fact => <Fact key={fact.id} newFact={false} fact={fact} likeFact={this.props.likeFact} postComment={this.props.postComment}/>)}
            </>
        )
    }
    

}

export default FactContainer