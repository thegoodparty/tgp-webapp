import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const TestComponent = ({Component, ...props}) => (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    </UiThemeProvider>
);

export default TestComponent;