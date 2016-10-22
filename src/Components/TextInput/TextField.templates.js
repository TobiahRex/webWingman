import React, { PropTypes } from 'react';
import { TextField } from 'material-ui';

export const firstName = ({ onChange }) => (
  <TextField
    floatingLabelText="First Name"
    onChange={e => onChange(e.target.value, 'firstName')}
    required
  />
);

export const lastName = ({ onChange }) => (
  <TextField
    floatingLabelText="Last Name"
    onChange={e => onChange(e.target.value, 'lastName')}
  />
);

export const email = ({ onChange }) => (
  <TextField
    floatingLabelText="Email"
    hintText="Email"
    onChange={e => onChange(e.target.value, 'email')}
  />
);

export const password = ({ onChange }) => (
  <TextField
    type="password"
    floatingLabelText="Confirm Password"
    onChange={e => onChange(e.target.value, 'password')}
  />
);

firstName.propTypes = {
  onChange: PropTypes.func.isRequired,
};
lastName.propTypes = {
  onChange: PropTypes.func.isRequired,
};
email.propTypes = {
  onChange: PropTypes.func.isRequired,
};
password.propTypes = {
  onChange: PropTypes.func.isRequired,
};

/* Received Props
const props = {
required: true,
onChange: e => onInputChange(e.target.value, e.target.getAttribute('id')),
};
*/
