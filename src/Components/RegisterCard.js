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
      {title}
    </CardText>

    <CardText>
      <TextField floatingLabelText="Email" hintText="Email" />
      <br />
      <TextField floatingLabelText="Password" />
      <br />
      <TextField floatingLabelText="Confirm Password" />
      <br />
    </CardText>
    <CardActions>
      <FlatButton label="Need to Login?" />
      <RaisedButton label="Register" secondary />
    </CardActions>
  </Card>
);

muiCard.propTypes = {
  title: PropTypes.string,
};

export default muiCard;
