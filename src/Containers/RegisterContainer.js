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
      error: '',
      success: '',
    };
    this.RegisterProps = {
      title: 'Register',
      submitNewUser: this.submitNewUser,
      onInputChange: this.onInputChange,
    };
    this.errorProps = {
      title: 'Password Error',
      open: false,
      onRequestClose: () => this.clearDialog('error'),
      modal: true,
      actions: [
        <FlatButton
          primary
          label="OK"
          onTouchTap={() => this.clearDialog('error')}
        />,
      ],
    };
    this.successProps = {
      title: 'Success!',
      open: false,
      onRequestClose: () => this.clearDialog('success'),
      modal: true,
      actions: [
        <FlatButton
          primary
          label="OK"
          onTouchTap={() => this.clearDialog('success')}
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
      this.setState({ error: 'Passwords do not match.  Please try again.' },
      () => (this.errorProps.open = true));
    } else {
      const { email, firstName, lastName, password } = this.state;
      this.successProps.open = true;
      this.setState({ success: 'You\'ve successfully been registered!\n\nConfirm your registration by clicking on the verification link.' },
      () => this.props.registerUser({ email, firstName, lastName, password }));
    }
  }
  clearDialog = (type) => {
    if (type === 'error') {
      this.setState({ error: '' });
      this.errorProps.open = false;
    } else {
      this.setState({ success: '' });
      this.successProps.open = false;
    }
  }
  render = () => (
    <div>
      <RegisterCard {...this.RegisterProps} />
      <Dialog {...this.errorProps} >
        {this.state.error}
      </Dialog>
      <Dialog {...this.errorProps} >
        {this.state.success}
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  registerUser: infoObj => dispatch(Actions.registerUser(infoObj)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);
