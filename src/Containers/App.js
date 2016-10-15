import React, { Component, PropTypes } from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { AppBar } from 'material-ui';
import NavBarProps from '../Components/NavBar/NavBarProps';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('super(props): ', super(props));
    console.log('props: ', props);
    this.state = {
      mainTitle: 'Wingman'
    }
  }

  setNavBarTitle = () => {

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
        <div>
          <AppBar
            title={this.state.mainTitle}
            iconElementRight={NavBarProps.appButtons()}
            />
          {props.children}
        </div>
      </MuiThemeProvider>
    )
  }
};

App.propTypes = {
  children: PropTypes.object, //eslint-disable-line
};

/*
  App inherits the following props:

  {
  children: Object,
  history:Object,
  location:Object,
  params:Object,
  route:Object,
  routeParams:Object,
  routes: Array
  }
*/
