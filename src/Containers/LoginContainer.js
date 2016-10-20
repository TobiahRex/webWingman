import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import LoginCard from '../Components/LoginCard';
import Actions from '../Redux/AuthRedux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      success: '',
    };
    this.LoginProps = {
      title: "Login",
      login: this.submitLogin,
    };
    this.errorProps = {
      title: 'Login Error',
      open: false,
      onRequestClose: () => this.closeDialog('error'),
      modal: true,
      actions: [
        <FlatButton
          label="OK"
          primary
          onTouchTap={() => this.closeDialog('error')}
        />,
      ],
    };
  }
  submitLogin = () => {
    const { email, password } = this.state;
    this.setState({ email: '', password: '' },
    () => this.props.loginUser(email, password));
  }
  closeDialog = (type) => {
    if (type === 'error') {
      this.setState({ success: '', error: this.props.apiError },
      () => (this.errorProps.open = true));
    } else {
      this.setState({ error: '',
        success: this.props.apiSuccess },
      () => (this.successProps.open = true));
    }
  }
  render = () => (
    <div>
      <LoginCard {...this.LoginProps} />
      <Dialog {...this.errorProps} >
        {this.state.error}
      </Dialog>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  apiError: PropTypes.string,
  apiSuccess: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  loginUser: userCreds => dispatch(Actions.loginUser(userCreds)),
});
const mapStateToProps = state => ({
  apiError: state.api.error,
  apiSuccess: state.api.success,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
