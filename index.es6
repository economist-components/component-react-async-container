import React, { PropTypes } from 'react'; // eslint-disable-line

export class RootContainer extends React.Component {
  static propTypes = {
    Component: PropTypes.func,
    route: PropTypes.func,
    renderFetched: PropTypes.func,
    renderFailure: PropTypes.func,
    renderLoading: PropTypes.func,
  }

  state = {
    data: {},
    readyState: 'loading',
  }

  componentDidMount() {
    return Promise.resolve(this.props.route()).then((response) => {
      this.setState({ data: response, readyState: 'fetched' });
    })
    .catch((error) => {
      this.setState({ data: error, readyState: 'failure' });
    });
  }

  render() {
    const { data, readyState } = this.state;
    const { Component } = this.props;
    const render = {
      loading: this.props.renderLoading,
      fetched: this.props.renderFetched || () => (<Component {...data}/>),
      failure: this.props.renderFailure,
    };
    if (typeof render[readyState] === 'function') {
      return render[readyState](data);
    }

    return <div />; // eslint-disable-line
  }
}

export const Impart = { RootContainer };
