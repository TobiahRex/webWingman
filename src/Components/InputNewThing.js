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
    this.PROPS = {
      form: {
        onSubmit: this.submitNewThing,
      },
      tf: {
        hintText: "Thing Name",
        type: "text",
        floatingLabelText: "New Thing Input",
        onChange: e => this.onInputChange(e),
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
        onClick: () => this.clearInput(),
      },
    };

    // --- Bindings
    this.submitNewThing = this.submitNewThing.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  // ------------ Static Methods ------------
  onInputChange(e) {
    this.setState({ newData: e.target.value });
  }

  submitNewThing(e) {
    e.preventDefault();
    this.setState({ newData: '' });
    this.props.fetching();
    this.props.createThing({ name: this.state.newData });
  }

  clearInput() {
    this.setState({ newData: '' });
  }

  // ------------ lifeCycle ------------

  render() {
    return (<div>
      <form {...this.PROPS.form}>
        <TextField {...this.PROPS.tf} />
        <RaisedButton {...this.PROPS.rb1} />
        <RaisedButton {...this.PROPS.rb2} />
      </form>
    </div>);
  }
}
