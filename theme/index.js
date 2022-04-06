import { createTheme } from '@material-ui/core/styles';
import colors from './colors';
import typography from './typography';
import palette from './palette';
import breakpointsPixels from './breakpointsPixels';
import breakpoints from './breakpoints';
// import creators from './creators';
const theme = createTheme({
  colors,
  typography,
  palette,
  breakpoints,
  breakpointsPixels,
  // creators,
});

export default theme;
