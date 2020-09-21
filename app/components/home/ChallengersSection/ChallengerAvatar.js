import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Body19, Subtitle } from 'components/shared/typogrophy';
import DemocratImg from 'images/democrat.png';
import RepublicanImg from 'images/republican.png';


const ChallengerAvatarWrapper = styled.div`
  background: url(${props => props.avatar});
  background-size: 100%;
  width: 7rem;
  min-height: 7rem;
  margin: 0 auto;
  border-radius: 3.5rem;
  box-shadow: 0px 0px 4.8436px rgba(0, 0, 0, 0.12), 0px 0px 3.6327px rgba(0, 0, 0, 0.08), 0px 0px 9.6872px rgba(0, 0, 0, 0.07);
  position: relative;
`;

const PartyIcon = styled.img`
	position: absolute;
	bottom: 0;
	left: 0;
	border: 4px solid white;
	background: white;
	border-radius: 20px;
`;
const ChallengerAvatar = ({ avatar, party, ...props}) => {
	let PartyImg;
	if(party[0] === 'D') {
		PartyImg = DemocratImg;
	} else if(party[0] === 'R') {
		PartyImg = RepublicanImg;
	}
  return (
    <ChallengerAvatarWrapper avatar={avatar} >
    	{PartyImg && 
    		<PartyIcon src={PartyImg} />
    	}
    </ChallengerAvatarWrapper>
  );
};

export default ChallengerAvatar;
