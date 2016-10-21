import React from 'react';
import { TextField } from 'material-ui';

export const firstName = props => (
  <TextField
    id="firstName"
    floatingLabelText="First Name"
    {...props}
  />
);

export const lastName = props => (
  <TextField
    id="lastName"
    floatingLabelText="Last Name"
    {...props}
  />
);

export const email = props => (
  <TextField
    id="registerEmail"
    floatingLabelText="Email"
    hintText="Email"
    {...props}
  />
);

export const password = props => (
  <TextField
    id="registerPwd"
    type="password"
    floatingLabelText="Password"
    {...props}
  />
);

export const confirmPassword = props => (
  <TextField
    id="registerPwdConfirm"
    type="password"
    floatingLabelText="Confirm Password"
    {...props}
  />
);

/* Received Props
  const props = {
    required: true,
    onChange: e => onInputChange(e.target.value, e.target.getAttribute('id')),
  };
*/
