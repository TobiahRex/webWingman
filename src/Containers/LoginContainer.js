import React, { PropTypes } from 'react';
import LoginCard from '../Components/LoginCard';

const Login = ({ login }) => (
  <div>
    <LoginCard
      title="Login"
      login={login}
    />
  </div>
);

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
