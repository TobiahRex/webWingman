import React, { PropTypes } from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { AppBar, FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';

const App = ({ children }) => {
  const PROPS = {
    title: "Wingman",
    appButtons: () => (
      <div>
        <FlatButton
          label="Login"
          onClick={() => browserHistory.push('/Login')}
        />
        <FlatButton
          label="Register"
          onClick={() => browserHistory.push('/Register')}
        />
      </div>
    )
  }

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
      <div>
        <AppBar
          title="Wingman"
          iconElementRight={PROPS.appButtons()}
        />
        {children}
      </div>
    </MuiThemeProvider>
  )
};

App.propTypes = {
  children: PropTypes.object, //eslint-disable-line
}

export default App;
