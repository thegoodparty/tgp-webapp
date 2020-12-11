import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import theme from './index';

const ThemeWrapper = ({ children }) => (
  <Provider store={{}}>
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter>{children}</ConnectedRouter>
      </ThemeProvider>
    </UiThemeProvider>
  </Provider>
);

ThemeWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ThemeWrapper;
