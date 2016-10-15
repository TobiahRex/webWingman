import React from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';

const NavBarProps = {
  title: "Wingman",
  appButtons: () => (
    <div>
      <FlatButton
        label="Login"
        onClick={() => { browserHistory.push('/Login'); }}
      />
      <FlatButton
        label="Register"
        onClick={() => { browserHistory.push('/Register'); }}
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
