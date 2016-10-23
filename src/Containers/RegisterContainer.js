import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import RegisterCard from '../Components/Auth/RegisterCard';
import Actions from '../Redux/AuthRedux';

class RegisterContainer extends React.Component {
  static propTypes = {
    apiSuccess: PropTypes.bool,
    apiError: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    statusMsg: PropTypes.string,
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
      statusMsg: '',
    };
    this.RegisterProps = {
      title: 'Register',
      submitNewUser: () => this.submitNewUser(this.state),
      onInputChange: this.onInputChange,
    };
    this.propsJSX = {
      error: {
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
      },
      success: {
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
      },
    };
  }

  onInputChange = (value, inputId) => this.setState({ [inputId]: value });

  submitNewUser = ({ email, firstName, lastName, password }) => {
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        error: 'Password do not match. Please Try again.',
        success: '',
      },
      () => (this.propsJSX.error.open = true));
    } else if (this.props.apiError) {
      this.setState({ error: this.props.statusMsg },
      () => (this.propsJSX.error.open = true));
    } else if (this.props.apiSuccess) {
      this.setState({
        error: '',
        success: this.props.statusMsg,
      }, () => {
        this.propsJSX.success.open = true;
        this.props.registerUser({ email, firstName, lastName, password });
      });
    }
  }

  clearDialog = (type) => {
    if (type === 'error') this.propsJSX.error.open = false;
    this.propsJSX.success.open = false;
    this.setState({ [type]: '' });
  }

  render = () => (
    <div>
      <RegisterCard {...this.RegisterProps} />
      <Dialog {...this.propsJSX.error} > {this.state.error} </Dialog>
      <Dialog {...this.propsJSX.success} > {this.state.success} </Dialog>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  registerUser: userObj => dispatch(Actions.registerUser(userObj)),
});
const mapStateToProps = state => ({
  apiSuccess: state.api.success,
  apiError: state.api.error,
  statusMsg: state.auth.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
