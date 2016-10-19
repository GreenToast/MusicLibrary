import React from 'react';
import { connect } from 'react-redux';
import * as MusicLibApi from '../api/music-lib.api';
import store from '../reducer/store';
const AlbumListContainer = React.createClass({

  componentDidMount: function() {
    MusicLibApi.getAll("album");
   },

  render: function() {
    return (
     // <UserList users={this.props.users} deleteUser={userApi.deleteUser} />
        <div>loading</div>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    albums: store.albums
  };
};

export default connect(mapStateToProps)(AlbumListContainer);