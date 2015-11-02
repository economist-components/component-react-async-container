# component-react-async-container

> A Container that fulfills its Component with a Promise. In the style of Relay.
**AsyncContainer** is a React component that, given a `Component` and a `route`, attempts to fulfill the data required in order to render an instance of Component.

## Goals

- [x] Similar interface to [Relay.RootContainer](https://facebook.github.io/relay/docs/guides-root-container.html) to help with the transition to it later on.

## Usage
```js
import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';
import { Impart } from '@economist/component-react-async-container';

class MyAppComponent extends React.Component {
  render() {
    return (
      <div {...this.props}>MyAppComponent</div>
    );
  }
}

ReactDOM.render(
  <Impart.RootContainer
    Component={MyAppComponent}
    route={() => (fetch('http://url/to/resource'))}
    renderLoading={() => (<div>Loading...</div>)}
    renderFailure={(error) => (<div>Error: {error.message}</div>)}
  />
, node);
```

### Component and route
Impart.RootContainer is a React component that, given a Component and a route, attempts to fulfill the data required in order to render an instance of Component.

```js
...
ReactDOM.render(
  <Impart.RootContainer
    Component={MyAppComponent}
    route={() => (fetch('http://url/to/resource'))}
  />
, node);
```

### renderLoading (optional)
This snippet configures Impart.RootContainer to render the "Loading..." text whenever it needs to fetch data.

```js
...
ReactDOM.render(
  <Impart.RootContainer
    Component={MyAppComponent}
    route={() => (fetch('http://url/to/resource'))}
    renderLoading={() => (<div>Loading...</div>)}
  />
, node);
```

### renderFailure (optional)
If an error occurs that prevents Impart.RootContainer from fetching the data required for rendering Component, nothing will be rendered by default. Error handling behavior can be configured by supplying a callback to the renderFailure prop.

```js
...
ReactDOM.render(
  <Impart.RootContainer
    Component={MyAppComponent}
    route={() => (fetch('http://url/to/resource'))}
    renderLoading={() => (<div>Loading...</div>)}
    renderFailure={(error) => (<div>Error: {error.message}</div>)}
  />
, node);
```

The `renderFailure` callback is called with a single argument.

### renderFetched (optional)
When all data necessary to render becomes available, Impart.RootContainer will render the supplied Component by default. However, we can change this behavior by supplying a callback to the renderFetched prop:

```js
...
ReactDOM.render(
  <Impart.RootContainer
    Component={MyAppComponent}
    route={() => (fetch('http://url/to/resource'))}
    renderLoading={() => (<div>Loading...</div>)}
    renderFailure={(error) => (<div>Error: {error.message}</div>)}
    renderFetched={() => (data) {
      return (
        <ScrollView>
          <ProfilePicture {...data} />
        </ScrollView>
      );
    }}
  />
, node);
```
