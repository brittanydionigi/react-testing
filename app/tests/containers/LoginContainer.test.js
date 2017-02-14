// Container components are fairly simple: they are usually just
// passing through state and actions as props. All we really need
// to test here is if the correct props end up on our wrapped components

import React from 'react'
import { mount  } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock';

import LoginContainer from '../../containers/LoginContainer'
import Login from '../../components/Login'

const mockStore = configureMockStore()({
  user: {
    name: 'Brittany',
    id: 1,
    favorites: [1, 2, 3, 4, 5]
  }
});

const setup = () => {
  const Container = mount(<Provider store={mockStore}><LoginContainer /></Provider>);
  const Component = Container.find(Login);

  return {
    Container,
    Component,
    mockStore
  }
}

describe('LoginContainer', () => {
  const { Container, Component } = setup();

  it('should pass the appropriate props from state', () => {
    expect(Component.props().user).toEqual({
      name: 'Brittany',
      id: 1,
      favorites: [1, 2, 3, 4, 5]
    });
  });

  it('should pass down the correct action creators', () => {
    expect(Object.keys(Component.props())).toContain('signIn', 'signOut');
  });

  it('should create a SIGN_IN_ERROR action when signIn fails', () => {
    // fetchMock.post('/api/users', Promise.reject());

    // let submitButton = Component.find('button');
    // submitButton.simulate('click');
    // expect(fetchMock.called()).toEqual(true);

    // console.log("MOCK STORE ACTIONS: ", mockStore.getActions());

  });
});