import React from 'react'
import { Modal, Button, Image, Header, Icon, Form } from 'semantic-ui-react'


class Fact extends React.Component  {
    state = {
        comment: "",
        showModal: false
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.postComment(this.state, this.props.fact)
        this.closeModal()
    }

    render(){
        const currentUserID = this.props.currentUser.id
        const isLiked = this.props.fact.likes.map(like => like.user.id).includes(currentUserID)
        const {
            showModal
          } = this.state
    return (
        <>
        <div className="ui raised very padded text container segment">
            <h3>{this.props.fact.username}</h3>
            <p>{this.props.fact.text}</p>
            {this.props.newFact ? 
            <div> 
                <button className="ui primary positive button" onClick={() => this.props.postFact(this.props.fact)}> Everyone should know this! </button>
                <button className="ui primary negative button" onClick={this.props.newFact}> Get me a different one :( </button>
            </div>
                 : 
                 <div>
                 <div className="ui labeled button" tabIndex="0" onClick={() => this.props.handleLike(this.props.fact, isLiked)}>
                 <div className="ui red button">
                     <i className="heart icon" ></i> {isLiked ? "Unlike" : "Like"}
                 </div>
                 <a className="ui basic red left pointing label">
                    {this.props.fact.get_likes}
                 </a>
                 </div>
                 <div className="ui labeled button" tabIndex="0">
                 <Modal onClose={this.closeModal} open={showModal} trigger={<Button className="ui blue button" onClick={() => this.setState({ showModal: true })}> Comment </Button>}>
                    <Modal.Header>Comment</Modal.Header>
                    <Modal.Content>
                    <Form>
                        <Form.Field>
                        <label>What is your opinion? </label>
                        <input name="comment" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form>
                    <Modal.Description>
                        <Button color='green' onClick={this.handleSubmit}>
                            <Icon name='checkmark'  /> Comment
                        </Button>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                <Modal trigger={<Button className="ui basic blue left pointing label"><a> {this.props.fact.get_comments} </a></Button>}>
                    <Modal.Header>Comments</Modal.Header>
                    <Modal.Content>
                        {this.props.fact.comments.map(comment => 
                        <div>
                        <h5> {comment.author}</h5>
                        <div> {comment.text} </div>
                        <br></br>
                        </div>)
                        }
                    </Modal.Content>
                </Modal>
                
                </div>
                </div>
             }
        </div>
        </>
    )
    }
}

export default Fact