import React from 'react';
import { render } from 'react-testing-library';

import ThemeWrapper from 'theme/ThemeWrapper';
import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
