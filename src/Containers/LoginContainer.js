import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginCard from '../Components/LoginCard';
import Actions from '../Redux/AuthRedux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  render = () => (
    <div>
      <LoginCard
        title="Login"
        login={this.props.loginUser}
      />
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginUser: userCreds => dispatch(Actions.loginUser(userCreds)),
});

export default connect(null, mapDispatchToProps)(Login);
