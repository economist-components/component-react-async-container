/* eslint-disable react/no-multi-comp, react/display-name */
import React from 'react';
import cache from './cache';
import fetch from './fetch';
import Impart from '.';

class MyAppComponent extends React.Component {
  doSomething() {
    console.log('You clicked'); // eslint-disable-line
  }

  render() {
    return (
      <div {...this.props} onClick={this.doSomething}>
        MyAppComponent - you can click me, but make sure your console is open :)
      </div>
    );
  }
}

export default (
  <Impart.RootContainer
    Component={MyAppComponent}
    cache={({ articleId }) => (cache(`/article/${articleId}`))}
    route={({ articleId }) => (fetch(`http://url/to/resource/${articleId}`))}
    renderLoading={() => (<div>Loading...</div>)}
    renderFailure={(error) => (<div>Error: {error.message}</div>)}
  />
);
