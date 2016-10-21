import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
/*
This Component relies on a piece of state passed down in props.
Should contain, an error, success, & fetching boolean.
*/
export default class muiToast extends React.Component {
  static propTypes = {
    apiStatus: {
      error: PropTypes.string,
      fetching: PropTypes.string,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      message: '',
      error: null,
      fetching: null,
    };

    this.PROPS = {
      open: this.state.show,
      message: this.state.message,
      autoHideDuration: 2000,
      onRequestClose: () => this.setState({ show: false }),
    };
  }

  componentWillMount() {
    this.setState({
      error: this.props.apiStatus.error,
      fetching: this.props.apiStatus.fetching,
    });
  }

  componentWillReceiveProps(nextProps) {
    const error = this.state.error;
    const fetching = this.state.fetching;
    const apiError = nextProps.apiStatus.error;
    const apiFetching = nextProps.apiStatus.fetching;

    if (!error && fetching && !apiError && !apiFetching) {
      // If fetching was successfully completed
      this.setState({
        message: "Logged in SUCCESSFULLY!",
        error: false,
        fetching: false,
        show: true,
      });
      return true;
    } else if (!error && apiError) {
      // if fetching yielded an error
      this.setState({
        message: "Database update FAILED!",
        error: true,
        fetching: false,
        show: true,
      });
      return true;
    }
    return true;
  }

  render() {
    return (
      <div>
        <Snackbar {...this.PROPS} />
      </div>
    );
  }
}
