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
      data: thing,
    };

    return (<div key={uuid()}><Thing {...propsJSX} /></div>);
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
  things: PropTypes.array, // eslint-disable-line
  apiStatus: PropTypes.shape({
    fetching: PropTypes.bool,
  }),
};

export default ThingList;
