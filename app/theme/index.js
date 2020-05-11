import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';
import typography from './typography';
import palette from './palette';
import breakpoints from './breakpoints';
import { creatorsBreakpoints, creatorsColors, creatorsTypography } from './creators';
const theme = createMuiTheme({
  colors: { ...colors, ...creatorsColors},
  typography: { ...typography, ...creatorsTypography},
  palette,
  breakpoints: {...breakpoints, ...creatorsBreakpoints},
});

export default theme;
