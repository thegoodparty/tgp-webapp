import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';
import typography from './typography';
import palette from './palette';
import breakpoints from './breakpoints';
import creators from './creators';
const theme = createMuiTheme({
  colors,
  typography,
  palette,
  breakpoints,
  creators,
});

export default theme;
