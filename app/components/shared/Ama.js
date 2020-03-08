import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { H3 } from 'components/shared/typogrophy';

const Wrapper = styled.div`
  margin: 38px auto 3.5rem;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    padding-bottom: 2rem;
  }
`;
const Title = styled(H3)`
  padding: 0 16px;
`;

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: '#FFF',
    padding: '10px 24px',
    border: '0.5px solid #F0F0F0',
    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.05)',
    marginTop: '12px;',
  },
}));

const Ama = () => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Title>Ask us Anything</Title>
      <form>
        <TextField
          multiline
          rows="4"
          fullWidth
          className={classes.input}
          placeholder="Ask questions and help improve the FAQ"
        />
      </form>
    </Wrapper>
  );
};

export default Ama;
