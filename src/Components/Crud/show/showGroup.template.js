import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { TextField, RaisedButton } from 'material-ui';
import styles from './showStyles';

const showGroup = ({ fetching, removeThing, updateState, name, _id }) => {
  const propsJSX = {
    tf: {
      id: uuid(),
      value: name,
      disabled: true,
    },
    rb1: {
      onClick: () => updateState('edit', true),
      type: 'button',
      label: 'Edit',
      style: styles.lftMargin,
      primary: true,
    },
    rb2: {
      onClick: () => {
        fetching();
        removeThing(_id);
      },
      type: 'button',
      label: 'Remove',
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

showGroup.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fetching: PropTypes.func.isRequired,
  removeThing: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired, //eslint-disable-line
};

export default showGroup;
