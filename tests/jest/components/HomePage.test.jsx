import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../src/components/HomePage';

describe('HomePage', () => {
  it('renders a the home page view', () => {
    const homePage = shallow(<HomePage />);
    expect(homePage).toMatchSnapshot();
  });
});
