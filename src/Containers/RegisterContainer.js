import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';
import RegisterCard from '../Components/Auth/RegisterCard';
import Actions from '../Redux/AuthRedux';

// TODO: use browserHistory.push('/profile/:id') upon successful registration.

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
      attepted: false,
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
            label="CLOSE"
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

  componentWillReceiveProps(nextProps) {
    if (!this.state.attempted) return;

    if (nextProps.apiSuccess) {
      this.propsJSX.success.open = true;
      this.setState({
        attempted: false,
        success: nextProps.statusMsg,
      });
    } else {
      this.propsJSX.error.open = true;
      this.setState({
        atttempted: false,
        error: nextProps.statusMsg,
      });
    }
  }

  onInputChange = (value, inputId) => this.setState({ [inputId]: value });

  submitNewUser = ({ email, firstName, lastName, password }) => {
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        error: 'Password do not match. Please Try again.',
        success: '',
      }, () => (this.propsJSX.error.open = true));
    } else {
      this.setState({ attempted: true },
      () => this.props.registerUser({ email, firstName, lastName, password }));
    }
  }

  clearDialog = (type) => {
    if (type === 'error') this.propsJSX.error.open = false;
    this.propsJSX.success.open = false;

    this.setState({
      [type]: '',
      statusMsg: '',
    });
  }

  render = () => {
    console.log({...this.propsJSX.error});
    return (
    <div>
      <RegisterCard {...this.RegisterProps} />
      <Dialog {...this.propsJSX.error} > {this.state.error} </Dialog>
      <Dialog {...this.propsJSX.success} > {this.state.success} </Dialog>
    </div>
  )}
}

const mapDispatchToProps = dispatch => ({
  registerUser: userObj => dispatch(Actions.registerUser(userObj)),
});
const mapStateToProps = state => ({
  apiSuccess: state.api.success,
  apiError: state.api.error,
  statusMsg: state.auth.status,
  active: state.auth.active,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
