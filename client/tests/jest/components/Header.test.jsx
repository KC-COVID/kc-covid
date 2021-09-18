import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../../src/components/Header';

const mockPush = jest.fn();
let mockPathName = '/';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({ pathname: mockPathName }),
}));

describe('Header', () => {
  afterEach(() => {
    mockPush.mockReset();
    mockPathName = '/';
  });

  it('renders the nav bar with a brand, toggle, and collapse', () => {
    const shallowedHeader = shallow(<Header />);
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('navigates to the home route when the home tab is clicked', () => {
    const shallowedHeader = shallow(<Header />);

    const homeTab = shallowedHeader.find('#home-tab');
    homeTab.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('navigates to the volunteer route when the volunteer tab is clicked', () => {
    const shallowedHeader = shallow(<Header />);

    const volunteerTab = shallowedHeader.find('#volunteer-tab');
    volunteerTab.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/volunteer');
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('navigates to the aid route when the aid tab is clicked', () => {
    const shallowedHeader = shallow(<Header />);

    const aidTab = shallowedHeader.find('#aid-tab');
    aidTab.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/aid');
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('navigates to the submit route when the submit tab is clicked', () => {
    const shallowedHeader = shallow(<Header />);

    const submitTab = shallowedHeader.find('#submit-tab');
    submitTab.simulate('click', {});

    expect(mockPush).toHaveBeenCalledWith('/submit');
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('displays the home tab as active when the path is /', () => {
    const shallowedHeader = shallow(<Header />);

    const homeTab = shallowedHeader.find('#home-tab');

    expect(homeTab.hasClass('active')).toBeTruthy();
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('displays the volunteer tab as active when the path is /volunteer', () => {
    mockPathName = '/volunteer';
    const shallowedHeader = shallow(<Header />);

    const homeTab = shallowedHeader.find('#home-tab');
    const volunteerTab = shallowedHeader.find('#volunteer-tab');

    expect(homeTab.hasClass('active')).toBeFalsy();
    expect(volunteerTab.hasClass('active')).toBeTruthy();
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('displays the aid tab as active when the path is /aid', () => {
    mockPathName = '/aid';
    const shallowedHeader = shallow(<Header />);

    const homeTab = shallowedHeader.find('#home-tab');
    const aidTab = shallowedHeader.find('#aid-tab');

    expect(homeTab.hasClass('active')).toBeFalsy();
    expect(aidTab.hasClass('active')).toBeTruthy();
    expect(shallowedHeader).toMatchSnapshot();
  });

  it('displays the submit tab as active when the path is /submit', () => {
    mockPathName = '/submit';
    const shallowedHeader = shallow(<Header />);

    const homeTab = shallowedHeader.find('#home-tab');
    const aidTab = shallowedHeader.find('#submit-tab');

    expect(homeTab.hasClass('active')).toBeFalsy();
    expect(aidTab.hasClass('active')).toBeTruthy();
    expect(shallowedHeader).toMatchSnapshot();
  });
});
