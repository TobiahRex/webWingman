import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { TextField, RaisedButton } from 'material-ui';
import styles from './editStyles';

const editGroup = (props) => {
  const propsJSX = {
    tf: {
      id: uuid(),
      onChange: e => props.updateState('newName', e.target.value),
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
      onClick: () => props.updateState('cancel'),
      type: "button",
      label: "Cancel",
      style: styles.btnMargin,
      secondary: true,
    },
  };
  return (
    <div>
      <TextField {...propsJSX.tf} />
      <RaisedButton {...propsJSX.rb1} />
      <RaisedButton {...propsJSX.rb2} />
    </div>
  );
};

editGroup.propTypes = {
  updateState: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
};

export default editGroup;
