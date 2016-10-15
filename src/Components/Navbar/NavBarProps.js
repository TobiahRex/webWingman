import React from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';

const NavBarProps = {
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
  ),
};

console.log('NavBarProps', NavBarProps);
export default NavBarProps;
