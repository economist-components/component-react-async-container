/* eslint-disable react/no-multi-comp, react/display-name */
import 'babel-polyfill';
import React from 'react';
import Impart from './';
import cache from './cache';
import fetch from './fetch';

cache('/article/1').set({
  style: {
    color: 'white',
    backgroundColor: 'black',
  },
  title: 'cached title',
  text: 'cached text',
});

export function MyAppComponent({
  text,
  title,
}) {
  function doSomething() {
    console.log('You clicked'); // eslint-disable-line
  }

  return (
    <div onClick={doSomething}>
      <div>{title}</div>
      <div>{text}</div>
      MyAppComponent - you can click me, but make sure your console is open :)
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  MyAppComponent.propTypes = {
    text: React.PropTypes.string,
    title: React.PropTypes.string,
  };
}

export function getCache({ articleId }) {
  return cache(`/article/${ articleId }`);
}

export function getFetch({ articleId }) {
  return fetch(`http://url/to/resource/${ articleId }`);
}

export function loadingHandler() {
  return (
    <div>Loading...</div>
  );
}

export function errorHandler(response) {
  return (
    <div>Error: {response.message}</div>
  );
}

export default (
  <Impart.RootContainer
    articleId={1}
    Component={MyAppComponent}
    cache={getCache}
    route={getFetch}
    renderLoading={loadingHandler}
    renderFailure={errorHandler}
  />
);
