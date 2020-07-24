import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const FormText = styled(TextField)`
  && {
    width: 100%;
    background: ${({ theme }) => theme.creators.colors.formColor};
    border-radius: 4px;
    margin-top: 0.8rem;
    .MuiInputBase-input {
      padding: 14px;
    }
    .MuiOutlinedInput-multiline {
      padding: 0;
    }
  }
`;

export default FormText;
