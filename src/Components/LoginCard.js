import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
  TextField,
} from 'material-ui';

const muiCard = ({ title, onInputChange, submitLogin }) => (
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
      <TextField floatingLabelText="Password" />
    </CardText>
    <CardActions>
      <FlatButton label="Forgot Password?" />
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
  login: PropTypes.func.isRequired,
};

export default muiCard;
