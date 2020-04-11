/**
 *
 * Tests for HomePageWrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import ThemeWrapper from 'theme/ThemeWrapper';

import HomePageWrapper from '../index';

describe('<HomePageWrapper />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <ThemeWrapper>
        <HomePageWrapper />
      </ThemeWrapper>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ThemeWrapper>
        <HomePageWrapper />
      </ThemeWrapper>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
