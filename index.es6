import React, { PropTypes } from 'react';

class RootContainer extends React.Component {
  static propTypes = {
    Component: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    route: PropTypes.func.isRequired,
    renderFetched: PropTypes.func,
    renderFailure: PropTypes.func,
    renderLoading: PropTypes.func,
  }

  state = {
    data: null,
    readyState: 'loading',
  }

  componentDidMount() {
    const { route = () => {}, ...remainingProps } = this.props;
    return Promise.resolve(route(remainingProps)).then((response) => {
      this.setState({ data: response, readyState: 'fetched' });
    })
    .catch((error) => {
      this.setState({ data: error, readyState: 'failure' });
    });
  }

  render() {
    const { data, readyState } = this.state;
    const {
      Component,
      renderFailure,
      renderFetched,
      renderLoading,
      ...remainingProps,
    } = this.props;
    /* eslint-disable no-else-return, no-lonely-if */
    if (readyState === 'failure') {
      if (renderFailure) {
        return renderFailure(data);
      }
    } else if (data) {
      if (renderFetched) {
        return renderFetched(data);
      } else {
        return <Component {...data} {...remainingProps} />;
      }
    } else {
      if (renderLoading) {
        return renderLoading();
      }
    }
    /* eslint-enable no-else-return, no-lonely-if */

    return undefined; // eslint-disable-line
  }
}

export default { RootContainer };
