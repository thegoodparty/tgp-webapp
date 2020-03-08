import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { H3, Body9, Body13 } from 'components/shared/typogrophy';
import tgpTheme from 'theme';
import statsImg from 'images/stats.svg';

const Wrapper = styled.div`
  margin-top: 60px;
`;
const Coming = styled(Body9)`
  margin-left: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const RowCenter = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

const A = styled.a`
  text-decoration: none;
`;

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '16px',
    borderRadius: '20px',
    padding: '4px 30px',
    fontFamily: tgpTheme.typography.fontFamily,
    letterSpacing: '0.1px',
    fontSize: '12px',
    color: tgpTheme.colors.gray7,
  },
}));

const GoodPartyStats = () => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Row>
        <H3>Good Party Stats</H3>
        <Coming>COMING SOON</Coming>
      </Row>

      <RowCenter>
        <div>
          <Body13>What would you like to know about The Good Party?</Body13>
          <A href="mailto:ask@thegoodparty.org">
            <Button
              variant="outlined"
              color="default"
              className={classes.button}
            >
              CONTACT US
            </Button>
          </A>
        </div>
        <img src={statsImg} />
      </RowCenter>
    </Wrapper>
  );
};

export default GoodPartyStats;
