import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../src/components/HomePage';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: mockPush }) }));

describe('HomePage', () => {
  afterEach(() => { mockPush.mockReset(); });

  it('renders a the home page view', () => {
    const homePage = shallow(<HomePage />);
    expect(homePage).toMatchSnapshot();
  });

  it('navigates to the volunteer page when the volunteer button is clicked', () => {
    const shallowedHomePage = shallow(<HomePage />);

    const volunteerButton = shallowedHomePage.find('#volunteer-button');
    volunteerButton.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/volunteer');
    expect(shallowedHomePage).toMatchSnapshot();
  });

  it('navigates to the aid page when the request aid button is clicked', () => {
    const shallowedHomePage = shallow(<HomePage />);

    const aidButton = shallowedHomePage.find('#aid-button');
    aidButton.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/aid');
    expect(shallowedHomePage).toMatchSnapshot();
  });

  it('navigates to the submit resources page when the request offer supplies button is clicked', () => {
    const shallowedHomePage = shallow(<HomePage />);

    const suppliesButton = shallowedHomePage.find('#supplies-button');
    suppliesButton.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/submit');
    expect(shallowedHomePage).toMatchSnapshot();
  });
});
