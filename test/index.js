/* eslint-disable react/no-multi-comp, react/display-name */
import 'babel-polyfill';
import React from 'react';
import chai from 'chai';
import Impart from '../src';
import StaticContainer from 'react-static-container';
const emptyFunction = Function.prototype;
chai.should();

function MyAppComponent({
  ...rest,
}) {
  return (
    <div className="myAppComponent" {...rest}>MyAppComponent</div>
  );
}

describe('Async Container', () => {
  it('renders a React Element', () => {
    React.isValidElement(
      <Impart.RootContainer
        Component={MyAppComponent}
        route={() => (Promise.resolve({}))} //eslint-disable-line
      />
    ).should.equal(true);
  });

  describe('render', () => {
    describe('when readyState is loading', () => {
      it('renders empty StaticContainer if renderLoading is not present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
        });
        instance.state = {
          data: {},
          readyState: 'loading',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate={false}>
            {null}
          </StaticContainer>
        );
      });

      it('renders StaticContainer with renderLoading result if present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
          renderLoading: () => (<div>Hello!</div>),
        });
        instance.state = {
          data: {},
          readyState: 'loading',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate>
            <div>Hello!</div>
          </StaticContainer>
        );
      });
    });

    describe('when readyState is fetched', () => {
      it('renders StaticContainer with MyAppComponent with props if renderFetched is not present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
        });
        instance.state = {
          data: { foo: 'bar' },
          readyState: 'fetched',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate>
            <MyAppComponent foo="bar" route={emptyFunction} />
          </StaticContainer>
        );
      });

      it('renders StaticContainer with result of renderFetched if present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
          renderFetched: () => (<div>Fetched!</div>),
        });
        instance.state = {
          data: { foo: 'bar' },
          readyState: 'fetched',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate>
            <div>Fetched!</div>
          </StaticContainer>
        );
      });
    });

    describe('when readyState is failure', () => {
      it('renders empty StaticContainer if renderFailure is not present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
        });
        instance.state = {
          data: 'error',
          readyState: 'failure',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate={false}>
            {null}
          </StaticContainer>
        );
      });

      it('renders StaticContainer with result of renderFailure if present', () => {
        const instance = new Impart.RootContainer({
          Component: MyAppComponent,
          route: emptyFunction,
          renderFailure: (error) => (<div>Error: {error}</div>),
        });
        instance.state = {
          data: 'error',
          readyState: 'failure',
        };
        instance.render().should.deep.equal(
          <StaticContainer shouldUpdate>
            <div>Error: {'error'}</div>
          </StaticContainer>
        );
      });
    });

  });
});
