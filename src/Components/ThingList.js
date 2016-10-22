import React, { PropTypes } from 'react';
import uuid from 'uuid';
import Thing from './Thing';
import SnackBar from '../Components/ApiSnackBar';

const ThingList = ({ fetching, removeThing, editThing, things, apiStatus }) => {
  const eachThing = things.map((thing) => {
    const propsJSX = {
      fetching,
      editThing,
      removeThing,
      apiStatus,
      name: thing.name,
      _id: thing._id,
    };

    return (
      <div key={uuid()}>
        <Thing {...propsJSX} />
      </div>
    );
  });

  return (
    <div>
      {eachThing}
      <SnackBar apiStatus={apiStatus} />
    </div>
  );
};

ThingList.propTypes = {
  fetching: PropTypes.func.isRequired,
  removeThing: PropTypes.func.isRequired,
  editThing: PropTypes.func.isRequired,
  things: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  })),
  apiStatus: PropTypes.shape({
    fetching: PropTypes.bool,
  }),
};

export default ThingList;
