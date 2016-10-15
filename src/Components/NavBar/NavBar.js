import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';
import NavBarProps from './NavBarProps';

export default class NavBar extends React.Component {
  state = {
    title: '',
  }

  componentWillMount() {
    const currentUrl = this.props.pathname;
    switch (currentUrl) {
      case '/Login': {
        this.setState({ title: 'Welcome Back!' });
      } break;
      default: {
        this.setState({ title: 'Wingman Chat' });
      } break;
    }
  }

  render = () => (
    <AppBar
      title={this.state.title}
      iconElementRight={NavBarProps.appButtons()}
    />
  );
}

NavBar.propTypes = {
  pathname: PropTypes.string,
};
