import React, { PropTypes } from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import NavBar from '../Components/NavBar/NavBar';

const App = ({ children, location }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
    <div>
      <NavBar {...location} />
      {console.log('children: ', children)}
      {children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
  children: PropTypes.object.isRequired, // eslint-disable-line
};

export default App;

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
