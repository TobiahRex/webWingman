import React, { PropTypes } from 'react';
import NavBarProps from './NavBarProps';

export default class NavBar extends React.Component {

  state = {
    currentLocation: ''
  }

  setTitleBar = () => {
    const currentLocation = this.props;
    console.log('currentLocation', currentLocation);
  }

  render() {
    return (
      <AppBar
        title={this.state.mainTitle}
        iconElementRight={NavBarProps.appButtons()}
      />
    )
  }
}
