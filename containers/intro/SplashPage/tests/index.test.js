/**
 *
 * Tests for SplashPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import ThemeWrapper from 'theme/ThemeWrapper';

// import 'jest-dom/extend-expect'; // add some helpful assertions

import SplashPage from '../index';

describe('<SplashPage />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(<SplashPage dispatch={dispatch} />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ThemeWrapper>
        <SplashPage />
      </ThemeWrapper>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
