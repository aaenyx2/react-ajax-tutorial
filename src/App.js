import React, { Component } from 'react';
import { Header } from './components';
import { PostContainer } from './containers';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                  <PostContainer></PostContainer>
            </div>
        );
    }
}

export default App;