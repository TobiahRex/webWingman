import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { TextField, RaisedButton } from 'material-ui';
import styles from './editStyles';

const editGroup = (props) => {
  const jsxProps = {
    tf: {
      id: uuid(),
      onChange: e => props.updateState({ newName: e.target.value }),
      value: this.state.newName,
    },
    rb1: {
      onClick: props.submitEdit,
      type: "submit",
      label: "Submit",
      style: styles.lftMargin,
      primary: true,
    },
    rb2: {
      onClick: () => props.updateState(false),
      type: "button",
      label: "Cancel",
      style: styles.btnMargin,
      secondary: true,
    },
  };
  return (
    <div>
      <TextField {...jsxProps.tf} />
      <RaisedButton {...jsxProps.rb1} />
      <RaisedButton {...jsxProps.rb2} />
    </div>
  );
};

editGroup.propTypes = {
  updateState: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

export default editGroup;
