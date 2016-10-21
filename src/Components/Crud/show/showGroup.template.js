import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { TextField, RaisedButton } from 'material-ui';
import styles from './showStyles';

const editGroup = (props) => {
  const PROPS = {
    tf: {
      id: uuid(),
      value: this.state.data.name,
      disabled: true,
    },
    rb1: {
      onClick: () => props.updateState('edit', true),
      type: "button",
      label: "Edit",
      style: styles.lftMargin,
      primary: true,
    },
    rb2: {
      onClick: () => {
        props.fetching();
        props.removeThing(this.props.data._id);
      },
      type: "button",
      label: "Remove",
      style: styles.btnMargin,
      secondary: true,
    },
  };
  return (
    <div>
      <TextField {...PROPS.tf} />
      <RaisedButton {...PROPS.rb1} />
      <RaisedButton {...PROPS.rb2} />
    </div>
  );
};

editGroup.propTypes = {
  fetching: PropTypes.func.isRequired,
  removeThing: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired, //eslint-disable-line
};

export default editGroup;
