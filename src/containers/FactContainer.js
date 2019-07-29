import React from 'react'
import Fact from '../components/Fact';

class FactContainer extends React.Component {
    
    render(){
        return(
            <>
                {this.props.newFacts.map(fact => <Fact key={fact} newFact={true} fact={fact} newFact={this.props.newFact} saveFact={this.props.saveFact} />)}
                {this.props.savedFacts.map(fact => <Fact key={fact} newFact={false} fact={fact} likeFact={this.props.likeFact}/>)}
            </>
        )
    }
    

}

export default FactContainer