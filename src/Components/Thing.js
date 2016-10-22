import React, { PropTypes, Component } from 'react';
// import SnackBar from 'material-ui';
import ShowGroup from './Crud/show/showGroup.template';
import EditGroup from './Crud/edit/editGroup.template';

export default class Thing extends Component {
  static propTypes = {
    fetching: PropTypes.func.isRequired,
    name: PropTypes.string,
    _id: PropTypes.string,
    editThing: PropTypes.func.isRequired,
    removeThing: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props._id,
      name: this.props.name,
      newName: this.props.name,
      edit: false,
    };
  }

  submitEdit = () => {
    const newThing = {
      _id: this.state._id,
      name: this.state.newName,
    };

    this.props.fetching();
    this.props.editThing(newThing);
    this.setState({ newName: '', data: {} });
  }

  updateState = (id, value) => {
    switch (id) {
      case 'edit': this.setState({ edit: value }); break;
      case 'newName': this.setState({ newName: value }); break;
      case 'submit': this.setState({ edit: false, value }); break;
      case 'cancel': this.setState({ edit: false, name: this.props.name }); break;
      default: break;
    }
  }

  render() {
    const propsJSX = {
      edit: {
        submitEdit: this.submitEdit,
        updateState: this.updateState,
        newName: this.state.newName,
      },
      show: {
        _id: this.state._id,
        name: this.state.name,
        updateState: this.updateState,
        removeThing: this.props.removeThing,
        fetching: this.props.fetching,
      },
    };
    return (
      <div>
        {this.state.edit ?
          <EditGroup {...propsJSX.edit} /> : <ShowGroup {...propsJSX.show} />
        }
      </div>
    );
  }
}
