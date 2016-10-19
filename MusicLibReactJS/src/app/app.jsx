import React from 'react';
import {render} from 'react-dom';
import AlbumListContainer from "./container/album-list.container"
import { Provider } from 'react-redux';
import store from "./reducer/store";

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <Provider store={store}>
          <AlbumListContainer />
        </Provider>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));