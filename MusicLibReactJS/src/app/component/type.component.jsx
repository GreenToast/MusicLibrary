import React from 'react';

export default class TypeComponent extends React.Component {

  render() {    
    let typeDetail = this.props.data?<div> {this.props.data._id} {this.props.data.properties.name}</div>:null;
    return (
        <div>
            <div onClick={() => this.props.fire(this.props.type)}>{this.props.type}</div>
            {typeDetail}
        </div>
    );
  }
}