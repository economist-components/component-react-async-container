import React, { PropTypes } from 'react';
import StaticContainer from 'react-static-container';

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
    let shouldUpdate = true;
    let children = null;
    if (readyState === 'failure') {
      if (renderFailure) {
        children = renderFailure(data);
      }
    } else if (data && readyState === 'fetched') {
      if (renderFetched) {
        children = renderFetched(data);
      } else {
        children = <Component {...data} {...remainingProps} />;
      }
    } else {
      /* eslint-disable no-lonely-if */
      if (renderLoading && readyState === 'loading') {
        children = renderLoading();
      }
      /* eslint-enable no-lonely-if */
    }

    if (!children) {
      shouldUpdate = false;
    }

    return (
      <StaticContainer shouldUpdate={shouldUpdate}>
        {children}
      </StaticContainer>
    );
  }
}

export default { RootContainer };
