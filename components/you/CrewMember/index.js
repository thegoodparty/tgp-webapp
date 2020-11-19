import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import heartImg from 'public/images/heart.svg';

import { Body13, Body11 } from 'components/shared/typogrophy/index';
import UserAvatar from 'components/shared/UserAvatar';

const Wrapper = styled(Body13)`
  text-align: center;
`;
const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heart = styled.img`
  display: inline-block;
  width: 14px;
  height: auto;
  margin-right: 5px;
`;
const CrewMember = ({
  crewMember,
  overrideName,
  overrideCount,
  showName = true,
}) => (
  <Wrapper key={crewMember.uuid} data-cy="crew-member">
    <UserAvatar user={crewMember} size="medium" />
    {showName && (
      <div
        style={{ marginTop: '4px' }}
        data-cy={overrideName ? 'you-name' : 'crew-name'}
      >
        {overrideName || crewMember.name}
      </div>
    )}
    <CountWrapper style={{ marginTop: showName ? '0' : '4px' }}>
      <Heart src={heartImg} />{' '}
      <Body11>{overrideCount || crewMember.crewCount || 1}</Body11>
    </CountWrapper>
  </Wrapper>
);

CrewMember.propTypes = {
  crewMember: PropTypes.object,
  overrideCount: PropTypes.number,
  overrideName: PropTypes.string,
  showName: PropTypes.bool,
};

export default CrewMember;
