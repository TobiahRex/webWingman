import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
  TextField,
} from 'material-ui';

const muiCard = ({ title }) => (
  <Card>

    <CardText>
      Props: { title || "'empty'" }
    </CardText>

    <CardText>
      <TextField floatingLabelText="Email" />
      <br />
      <TextField floatingLabelText="Password" />
    </CardText>
    <CardActions>
      <FlatButton label="Forgot Password" />
      <RaisedButton label="Login" primary />
    </CardActions>
  </Card>
);

muiCard.propTypes = {
  title: PropTypes.string,
};

export default muiCard;
