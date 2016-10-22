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
    // --- JSX prop
    this.propsJSX = {
      form: {
        onSubmit: this.submitNewThing,
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
  }

  // ------------ Static Methods ------------

  submitNewThing = () => {
    event.preventDefault();
    this.setState({ newData: '' });
    this.props.fetching();
    this.props.createThing({ name: this.state.newData });
  }

  // ------------ lifeCycle ------------

  render() {
    return (<div>
      <form {...this.propsJSX.form}>
        <TextField {...this.propsJSX.tf} />
        <RaisedButton {...this.propsJSX.rb1} />
        <RaisedButton {...this.propsJSX.rb2} />
      </form>
    </div>);
  }
}
