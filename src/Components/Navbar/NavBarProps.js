import React from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';

export const PROPS = {
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
