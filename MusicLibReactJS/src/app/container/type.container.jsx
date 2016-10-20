import React from 'react';
import { connect } from 'react-redux';
import * as MusicLibApi from '../api/music-lib.api';
import store from '../reducer/store';
import TypeComponent from '../component/type.component';

class TypeContainer extends React.Component{

  componentDidMount() {  
      MusicLibApi.getTypeWithRelations(this.props.params.type, this.props.params.id);
   }

  render() {
    return (
     <TypeComponent type={this.props.params.type} data={this.props.data} fire={this.fire}/>
    );
  }

  fire = (t,y,z) =>  {
      console.log('fire',t,y,z);
  }

}



const mapStateToProps = function(store) {
    return {
        data: store.type
    };
};

export default connect(mapStateToProps)(TypeContainer);