import React from 'react';
import { Link } from 'react-router';

export default class TypeListComponent extends React.Component {

  render() {
    return (
      <ul>
        {this.props.list.map((element) => {
          return (
            <li key={element._id}>
              <Link to={this.props.type + "/" + element._id}>{element.properties.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

}