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

export const password = ({ id, type, label, onChange }) => (
  <TextField
    id={id}
    type={type}
    floatingLabelText={label}
    onChange={e => onChange(e.target.value, e.target.getAttribute('id'))}
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
