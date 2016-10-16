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


const RegisterCard = props => (
  <Card>
    <CardText>
      {props.title}
    </CardText>

    <CardText>
      <TextField
        floatingLabelText="Email"
        hintText="Email"
        onChange={e => props.onInputChange(e)}
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
      />
    </CardActions>
  </Card>
);
// onClick={props.submitNewUser}

RegisterCard.propTypes = {
  title: PropTypes.string,
  submitNewUser: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default RegisterCard;
