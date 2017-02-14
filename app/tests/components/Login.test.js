// Tests for unwrapped components should NOT be heavily dependent on
// the DOM elements or content that's being rendered. Many examples
// out there show the simple tests of making sure elements and text
// are being rendered correctly, but if we're testing the existence
// of text within a component, any time we change that language, we're
// going to have to rewrite our tests. Good use-cases for testing what's
// being rendered are when you have conditional elements/copy based on
// the current state/props of the component. e.g. if you are not logged
// in and a user tries to do something only an authenticated user can
// do, assert that "You can't do that" is rendered.

import React from 'react';
import { shallow } from 'enzyme';

import Login from '../../components/Login';

describe('User component', () => {

  const mockUser = {
    data: {
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    }
  };

  const LoginComponent = shallow(<Login user={mockUser.data} />);

  it('autofills email input if a user is currently logged in', () => {
    let emailInput = LoginComponent.find('input[name="email"]');
    expect(emailInput.props().value).toEqual('foo@bar.com');
  });

  it('should display an error message if the email format is invalid', () => {
    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', { 
      target: { 
        name: 'email',
        value: 'foobar'
      }
    });
    submitButton.simulate('click');

    let expectedErrorMessage = 'Invalid Email';
    let errorElement = LoginComponent.find('.errorMessage');

    expect(LoginComponent.state().error).toEqual(expectedErrorMessage);
    expect(errorElement.length).toEqual(1);
    expect(errorElement.text()).toEqual(expectedErrorMessage);
  });

  it('displays an error message if the credentials do not match');
  it('redirects to home route on successful login');

});

