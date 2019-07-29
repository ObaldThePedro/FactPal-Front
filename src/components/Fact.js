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
                 : 
                 <div>
                 <div className="ui labeled button" tabindex="0" onClick={() => props.likeFact(props.fact)}>
                 <div className="ui red button">
                     <i className="heart icon" ></i> Like
                 </div>
                 <a className="ui basic red left pointing label">
                    {props.fact.get_likes}
                 </a>
                 </div>
                <button className="ui blue button"> Comment </button>
                </div>
             }
        </div>


        </>
    )
}

export default Fact