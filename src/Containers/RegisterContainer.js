import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import RegisterCard from '../Components/RegisterCard';
import Actions from '../Redux/AuthRedux';

class RegisterContainer extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      error: false,
    };
    this.RegisterProps = {
      title: 'Register',
      submitNewUser: this.submitNewUser,
      onInputChange: this.onInputChange,
    };
    this.errorProps = {
      title: 'Password Error',
      open: false,
      onRequestClose: this.resetError,
      modal: true,
      actions: [
        <FlatButton
          primary
          label="OK"
          onTouchTap={this.resetError}
          />,
      ],
    };
  }
  onInputChange = (value, inputId) => {
    switch (inputId) {
      case "firstName": {
        this.setState({ firstName: value });
      } break;
      case "lastName": {
        this.setState({ lastName: value });
      } break;
      case "registerEmail": {
        this.setState({ email: value });
      } break;
      case "registerPwd": {
        this.setState({ password: value });
      } break;
      case "registerPwdConfirm": {
        this.setState({ confirmPassword: value });
      } break;
      default: break;
    }
  }
  submitNewUser = () => {
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({ error: 'Password do not match.  Please try again.' });
      return (this.errorProps.open = true);
    }
    return this.props.registerUser(this.state);
  }
  resetError = () => {
    this.setState({ error: '' });
    this.errorProps.open = false;
  }
  render = () => {
    console.log('this.errorProps: ', this.errorProps);
    console.log('this.state: ', this.state);
    return (
      <div>
        <RegisterCard {...this.RegisterProps} />
        <Dialog {...this.errorProps} >{this.state.error}</Dialog>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  registerUser: infoObj => dispatch(Actions.registerUser(infoObj)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);
