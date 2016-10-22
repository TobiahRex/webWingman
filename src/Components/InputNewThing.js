import React, { PropTypes, Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import styles from './Styles/InputStyles';

export default class InputNewThing extends Component {
  // --- Statics --- //
  static propTypes = {
    fetching: PropTypes.func.isRequired,
    createThing: PropTypes.func.isRequired,
  };
  // --- Constructor --- //
  constructor(props) {
    super(props);
    // --- State
    this.state = {
      newData: '',
    };
  }
  // ------------ Static Methods ------------

  submitNewThing = (e) => {
    e.preventDefault();
    this.setState({ newData: '' });
    this.props.fetching();
    this.props.createThing({ name: this.state.newData });
  }
  // ------------ lifeCycle ------------

  render() {
    const propsJSX = {
      form: {
        onSubmit: e => this.submitNewThing(e),
      },
      tf: {
        hintText: "Thing Name",
        type: "text",
        floatingLabelText: "New Thing Input",
        onChange: e => this.setState({ newData: e.target.value }),
        required: true,
        value: this.state.newData,
      },
      rb1: {
        style: styles.lftMargin,
        primary: true,
        label: "add",
        type: "submit",
      },
      rb2: {
        style: styles.lftMargin,
        secondary: true,
        label: "clear",
        type: "button",
        onClick: () => this.setState({ newData: '' }),
      },
    };
    return (
      <div>
        <form {...propsJSX.form}>
          <TextField {...propsJSX.tf} />
          <RaisedButton {...propsJSX.rb1} />
          <RaisedButton {...propsJSX.rb2} />
        </form>
      </div>
    );
  }
}
