import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterCard from '../Components/RegisterCard';
import Actions from '../Redux/AuthRedux';

class RegisterContainer extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.RegisterProps = {
      title: 'Register',
      submitNewUser: this.submitNewUser,
      onInputChange: this.onInputChange,
      setRefs: this.setRefs,
    };
  }
  onInputChange = (value, inputId) => {
    switch (inputId) {
      case "registerEmail": {
        this.setState({ username: value });
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
    this.props.registerUser(this.state);
  }
  render = () => {
    console.log('this.state: ', this.state);
    return (
      <div>
        <RegisterCard {...this.RegisterProps} />
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  registerUser: infoObj => dispatch(Actions.registerUser(infoObj)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);
