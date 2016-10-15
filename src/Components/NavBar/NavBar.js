import React from 'react';
import { browserHistory } from 'react-router';
import { AppBar } from 'material-ui';
import NavBarProps from './NavBarProps';

export default class NavBar extends React.Component {

  state = {
    currentLocation: '',
  }

  setTitleBar = () => {
    const currentLocation = this.props;
    console.log('currentLocation', currentLocation);
  }

  render() {
    console.log('browserHistory: ', browserHistory);
    return (
      <AppBar
        title={this.state.mainTitle}
        iconElementRight={NavBarProps.appButtons()}
      />
    )
  }
}
