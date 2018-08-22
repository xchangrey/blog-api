import React, { Component } from 'react';
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

class PostModal extends Component {
  state = {
    modal: false,
    title: '',
    body: '',
    author: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    }

    // Add via addPost action
    this.props.addPost(newPost);

    //Close the modal
    this.toggle();
  };

  render(){
    return (
      <div>
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
          Add Post
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Posts</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Add Title" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input type="text" name="author" id="author" placeholder="Add Author" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Input type="textarea" name="body" id="body" placeholder="Add Body" onChange={this.onChange} />
              </FormGroup>
            <Button
              color="dark"
              style={{ marginTop: '2rem' }}
              block
            >Add Post</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
      );
  }

}


const mapStateToProps = state => ({
  post: state.post
});


export default connect(mapStateToProps, { addPost })(PostModal);