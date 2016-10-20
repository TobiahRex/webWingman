import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import RegisterCard from '../Components/RegisterCard';
import Actions from '../Redux/AuthRedux';

class RegisterContainer extends React.Component {
  static propTypes = {
    apiSuccess: PropTypes.string,
    apiError: PropTypes.string,
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
      submitNewUser: () => this.submitNewUser(this.state),
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
  submitNewUser = ({ email, firstName, lastName, password }) => {
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({ error: this.props.apiError, success: '' },
      () => (this.errorProps.open = true));
    } else {
      this.successProps.open = true;
      this.setState({ error: '', success: this.props.apiSuccess },
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
  registerUser: userObj => dispatch(Actions.registerUser(userObj)),
});
const mapStateToProps = state => ({
  apiSuccess: state.api.success,
  apiError: state.api.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
