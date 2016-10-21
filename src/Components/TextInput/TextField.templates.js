import React from 'react';
import { TextField } from 'material-ui';

export const FirstName = props => (
  <TextField
    id="firstName"
    floatingLabelText="First Name"
    {...props}
  />
);

export const LastName = props => (
  <TextField
    id="lastName"
    floatingLabelText="Last Name"
    {...props}
  />
);

export const Email = props => (
  <TextField
    id="registerEmail"
    floatingLabelText="Email"
    hintText="Email "
    {...props}
  />
);

export const Password = props => (
  <TextField
    id="registerPwd"
    type="password"
    floatingLabelText="Password"
    {...props}
  />
);

export const ConfirmPassword = props => (
  <TextField
    id="registerPwdConfirm"
    type="password"
    floatingLabelText="Confirm Password"
    {...props}
  />
);
