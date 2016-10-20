import React from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';

const NavBarProps = {
  title: "Wingman",
  appButtons: () => (
    <div>
      <FlatButton
        label="Login"
        onClick={() => { browserHistory.push('/login'); }}
      />
      <FlatButton
        label="Register"
        onClick={() => { browserHistory.push('/register'); }}
      />
      <FlatButton
        label="Home"
        onClick={() => { browserHistory.push('/'); }}
      />
    </div>
  ),
};
export default NavBarProps;
NavBarProps.appButtons.displayName = 'Login&RegisterButons';
