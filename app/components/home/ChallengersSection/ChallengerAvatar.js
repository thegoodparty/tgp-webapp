import React from 'react';
import styled from 'styled-components';

import DemocratImg from 'images/democrat.png';
import RepublicanImg from 'images/republican.png';
import IndependentImg from 'images/independent.png';

const ChallengerAvatarWrapper = styled.div`
  background: url(${props => props.avatar});
  background-size: 100%;
  width: 7rem;
  min-height: 7rem;
  margin: 0 auto;
  border-radius: 3.5rem;
  box-shadow: 0px 0px 4.8436px rgba(0, 0, 0, 0.12),
    0px 0px 3.6327px rgba(0, 0, 0, 0.08), 0px 0px 9.6872px rgba(0, 0, 0, 0.07);
  position: relative;
`;

const PartyIcon = styled.img`
  position: absolute;
  bottom: -10px;
  left: -10px;
  border: 4px solid white;
  background: white;
  border-radius: 50%;
`;
const ChallengerAvatar = ({ avatar, party, ...props }) => {
  let PartyImg;
  if (party === 'D') {
    PartyImg = DemocratImg;
  } else if (party === 'R') {
    PartyImg = RepublicanImg;
  } else if (party === 'I') {
    PartyImg = IndependentImg;
  }
  return (
    <ChallengerAvatarWrapper avatar={avatar}>
      {PartyImg && <PartyIcon src={PartyImg} />}
    </ChallengerAvatarWrapper>
  );
};

export default ChallengerAvatar;
