import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {
  Card,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
  TextField,
} from 'material-ui';

const RegisterCard = ({ title, onInputChange, submitNewUser }) => {
  const PROPS = {
    required: true,
    onChange: e => onInputChange(e.target.value, e.target.getAttribute('id')),
  };

  return (
    <Card>
      <CardText>
        {title || "EMPTY prop"}
      </CardText>

      <CardText>
        <TextField
          id="firstName"
          floatingLabelText="First Name"
          {...PROPS}
        />
        <br />
        <TextField
          id="lastName"
          floatingLabelText="Last Name"
          {...PROPS}
        />
        <br />
        <TextField
          id="registerEmail"
          floatingLabelText="Email"
          hintText="Email"
          {...PROPS}
        />
        <br />
        <TextField
          id="registerUsername"
          floatingLabelText="Username"
          hintText="Username"
          {...PROPS}
        />
        <br />
        <TextField
          id="registerPwd"
          type="password"
          floatingLabelText="Password"
          {...PROPS}
        />
        <br />
        <TextField
          id="registerPwdConfirm"
          type="password"
          floatingLabelText="Confirm Password"
          {...PROPS}
        />
        <br />
      </CardText>
      <CardActions>
        <FlatButton
          label="Need to Login?"
          onClick={() => { browserHistory.push('/Login'); }}
        />
        <RaisedButton
          label="Register"
          secondary
          onClick={submitNewUser}
        />
      </CardActions>
    </Card>
  );
};

RegisterCard.propTypes = {
  title: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
};

export default RegisterCard;
