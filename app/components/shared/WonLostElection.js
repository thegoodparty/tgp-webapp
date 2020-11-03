import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Body12 } from './typogrophy';

const Wrapper = styled.div`
  text-align: center;
  margin: 30px auto 20px;
`;
const Pill = styled(Body12)`
  display: inline-block;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colors.gray7};
  border: solid 1px ${({ theme }) => theme.colors.grayC};
  border-radius: 8px;
  background-color: #fff;
`;

const WonLostElection = ({ candidate, style = {} }) => {
  let resultStatus;
  console.log('candidate.votesReceived', candidate.votesReceived);
  console.log('candidate.votesNeeded', candidate.votesNeeded);
  if (
    !candidate.votesReceived ||
    candidate.votesReceived === 0 ||
    candidate.votesReceived === candidate.votesNeeded
  ) {
    resultStatus = 'pending';
  } else if (candidate.votesReceived > candidate.votesNeeded) {
    resultStatus = 'won';
  } else {
    resultStatus = 'lost';
  }

  return (
    <Wrapper style={style}>
      <Pill>
        {resultStatus === 'pending' && <>RESULTS PENDING 🗳</>}
        {resultStatus === 'won' && <>WON ELECTION 🎉</>}
        {resultStatus === 'lost' && <>LOST ELECTION 👎</>}
      </Pill>
    </Wrapper>
  );
};

WonLostElection.propTypes = {
  style: PropTypes.object,
  candidate: PropTypes.object,
  whiteBorder: PropTypes.bool,
};

export default WonLostElection;
