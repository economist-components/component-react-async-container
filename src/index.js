/* eslint-disable id-blacklist, no-empty-function */
import React, { PropTypes } from 'react';
import StaticContainer from 'react-static-container';

class RootContainer extends React.Component {
  state = {
    data: null,
    readyState: 'loading',
  }

  componentWillMount() {
    this.loadCache();
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: null, readyState: 'loading' });
    this.loadData(nextProps);
  }

  loadCache() {
    const { cache, ...remainingProps } = this.props;
    if (cache) {
      const cacheData = cache(remainingProps).get();
      if (cacheData) {
        this.setState({ data: cacheData, readyState: 'cached' });
      }
    }
  }

  loadData(props) {
    const { route = () => {}, ...remainingProps } = props;
    Promise.resolve(route(remainingProps)).then((response) => {
      this.setState({ data: response, readyState: 'fetched' });
    }).catch((error) => {
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
    } else if (data && (readyState === 'fetched' || readyState === 'cached')) {
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

if (process.env.NODE_ENV !== 'production') {
  RootContainer.propTypes = {
    Component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]).isRequired,
    cache: PropTypes.func,
    route: PropTypes.func.isRequired,
    renderFetched: PropTypes.func,
    renderFailure: PropTypes.func,
    renderLoading: PropTypes.func,
  };
}
