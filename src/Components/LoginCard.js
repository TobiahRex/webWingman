import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
  TextField,
} from 'material-ui';

const muiCard = ({ title, onInputChange, submitLogin, navigateTo }) => (
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
        id="forgot"
        label="Forgot Password?"
        onClick={e => navigateTo(e.target.getAttribute('id'))}
      />
      <RaisedButton
        label="Login"
        primary
        onCLick={submitLogin}
      />
    </CardActions>
  </Card>
);

muiCard.propTypes = {
  title: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default muiCard;
