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
    onChange: onInputChange,
  };
  return (
    <Card>
      <CardText> {title || "EMPTY prop"} </CardText>
      <CardText>
        <Input.firstName {...props} />
        <br />
        <Input.lastName {...props} />
        <br />
        <Input.email {...props} />
        <br />
        <Input.password {...props} />
        <br />
        <Input.confirmPassword {...props} />
        <br />
      </CardText>
      <CardActions>
        <FlatButton
          label="Need to Login?"
          onClick={() => browserHistory.push('/Login')}
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
