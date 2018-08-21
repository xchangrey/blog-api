import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import PropTypes from 'prop-types';

class PostList extends Component {
  
  componentDidMount() {
    this.props.getPosts();
  }

  onDeleteClick = (id) => {
    this.props.deletePost(id);
  }

  render(){
    const { posts } = this.props.post;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="post-list">
            {posts.map(({_id, title, body}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn mr-2"
                    color="danger"
                    size="sm"
                    onClick ={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  <h3 className="text-success">{title}</h3>
                  <p>{body}</p>

                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})


export default connect(mapStateToProps, { getPosts, deletePost }) (PostList);