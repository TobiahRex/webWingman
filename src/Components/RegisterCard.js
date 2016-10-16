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


const RegisterCard = ({ title, onInputChange, submitNewUser }) => (
  <Card>
    <CardText>
      {title}
    </CardText>

    <CardText>
      <TextField
        floatingLabelText="Email"
        hintText="Email"
        onChange={e => onInputChange(e)}
      />
      <br />
      <TextField floatingLabelText="Password" />
      <br />
      <TextField floatingLabelText="Confirm Password" />
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

RegisterCard.propTypes = {
  title: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
};

export default RegisterCard;
