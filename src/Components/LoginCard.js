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

const LoginCard = ({ title, onInputChange, submitLogin }) => (
  <Card>
    <CardText>
      Props: { title || "'empty'" }
    </CardText>

    <CardText>
      <TextField
        id="Username"
        floatingLabelText="Username"
        hintText="Email or Username"
        onChange={e =>
          onInputChange(e.target.value, e.target.getAttribute('id'))
        }
      />
      <br />
      <TextField
        id="password"
        floatingLabelText="Password"
        type="password"
        onChange={e =>
          onInputChange(e.target.value, e.target.getAttribute('id'))
        }
      />
    </CardText>
    <CardActions>
      <FlatButton
        label="Forgot Password?"
        onClick={() => browserHistory.push('/forgot')}
      />
      <RaisedButton
        label="Login"
        primary
        onCLick={submitLogin}
      />
    </CardActions>
  </Card>
);

LoginCard.propTypes = {
  title: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default LoginCard;
