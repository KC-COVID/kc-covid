import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from '../../../src/components/ErrorBoundary';

// Test component needed because we can't run "simulateError" on base components (like <p>).
function TestComp() {
  return <p>I am the child</p>;
}

describe('ErrorBoundary', () => {
  it('shows the error view when an error occurs in the children', () => {
    const shallowedErrorBoundary = shallow(
      <ErrorBoundary>
        <TestComp id="pchild" />
      </ErrorBoundary>,
    );
    const child = shallowedErrorBoundary.find('#pchild');

    expect(shallowedErrorBoundary.state().hasError).toBeFalsy();
    expect(child.get(0)).toBeTruthy();
    expect(shallowedErrorBoundary).toMatchSnapshot();

    const error = new Error('test');
    child.simulateError(error);

    expect(shallowedErrorBoundary.state().hasError).toBeTruthy();
    expect(shallowedErrorBoundary.find('pchild').get(0)).toBeFalsy();
    expect(shallowedErrorBoundary).toMatchSnapshot();
  });
});
