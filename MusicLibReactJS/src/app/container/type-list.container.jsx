import React from 'react';
import { connect } from 'react-redux';
import * as MusicLibApi from '../api/music-lib.api';
import store from '../reducer/store';
import TypeListComponent from '../component/type-list.component';

class TypeListContainer extends React.Component{

  componentDidMount() {
    MusicLibApi.getAll(this.props.params.type);
   }

  render() {
    return (
     <TypeListComponent type={this.props.params.type} list={this.props.types}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    types: store.typelist
  };
};

export default connect(mapStateToProps)(TypeListContainer);