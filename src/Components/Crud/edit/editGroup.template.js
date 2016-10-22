import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { TextField, RaisedButton } from 'material-ui';
import styles from './editStyles';

const editGroup = ({ newName, updateState, submitEdit }) => {
  const propsJSX = {
    tf: {
      id: uuid(),
      onChange: e => updateState('newName', e.target.value),
      value: newName,
    },
    rb1: {
      onClick: submitEdit,
      type: "submit",
      label: "Submit",
      style: styles.lftMargin,
      primary: true,
    },
    rb2: {
      onClick: () => updateState('cancel'),
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
  newName: PropTypes.string.isRequired,
  submitEdit: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default editGroup;
