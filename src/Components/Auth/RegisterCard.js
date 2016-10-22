import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {
  Card,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
} from 'material-ui';
import * as Input from '../TextInput/TextField.templates';

const RegisterCard = ({ title, onInputChange, submitNewUser }) => {
  const props = {
    all: {
      onChange: onInputChange,
    },
    password: {
      id: 'password',
      type: 'password',
      label: 'Password',
    },
    confirmPassword: {
      id: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
    },
  };

  return (
    <Card>
      <CardText> {title || "EMPTY prop"} </CardText>
      <CardText>
        <Input.firstName {...props.all} />
        <br />
        <Input.lastName {...props.all} />
        <br />
        <Input.email {...props.all} />
        <br />
        <Input.password {...props.password} {...props.all} />
        <br />
        <Input.password {...props.confirmPassword} {...props.all} />
        <br />
      </CardText>
      <CardActions>
        <FlatButton
          label="Need to Login?"
          onClick={() => browserHistory.push('/login')}
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
  all: PropTypes.shape({
    onInputChange: PropTypes.func.isRequired,
  }),
  password: PropTypes.shape({}),
  confirmPassword: PropTypes.shape({}),
  submitNewUser: PropTypes.func.isRequired,
};

export default RegisterCard;
