import React from 'react'

const Fact = (props) => {

    return (
        <>
        <div className="ui raised very padded text container segment">
            <h3>{props.fact.username}</h3>
            <p>{props.fact.text}</p>
            {props.newFact ? 
            <div> 
                <button className="ui primary positive button" onClick={() => props.saveFact(props.fact)}> Everyone should know this! </button>
                <button className="ui primary negative button" onClick={props.newFact}> Get me a different one :( </button>
            </div>
                 : "This is old"}
        </div>
        
        </>
    )
}

export default Fact