import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';

import AppNavbar from './components/Navbar';
import PostList from './components/PostList';
import PostModal from './components/PostModal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <PostModal />
            <PostList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
