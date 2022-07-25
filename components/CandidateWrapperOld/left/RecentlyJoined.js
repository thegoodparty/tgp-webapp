/**
 *
 * RecentlyJoined
 *
 */

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Truncate from 'react-truncate';

import { Font16, FontH3 } from '/components/shared/typogrophy';
import { CandidateContext } from '/containers/CandidatePage';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

const JoinName = styled(Font16)`
  color: ${({ theme }) => theme.colors.gray3};
  font-weight: 600;
  display: inline-block;
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;

const JoinTime = styled(Font16)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  font-size: 13px;
`;

const Message = styled(Font16)`
  margin-top: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 16px;
  }
`;

const SeeMore = styled.div`
  font-size: 13px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
  cursor: pointer;
`;

const JoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const RecentJoin = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 0;
  text-align: left;
  position: relative;
  font-size: 13px;
`;

const Img = styled.img`
  margin-right: 8px;
  height: 32px;
  width: 32px;
`;

function RecentlyJoined() {
  const { candidateSupports } = useContext(CandidateContext);

  const supporters = candidateSupports || [];
  let displaySupporters = supporters;
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [truncated, setTruncated] = useState(false);
  if (!showAll) {
    displaySupporters = displaySupporters.slice(0, 2);
  }

  const lines = 3;

  const handleTruncate = (isTruncated) => {
    if (truncated !== isTruncated) {
      setTruncated(isTruncated);
    }
  };

  const toggleLines = (e) => {
    e.preventDefault();

    setExpanded(!expanded);
  };

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const supportUser = (supporter) => {
    if (!supporter || !supporter.user) {
      return 'Anonymous';
    }
    if (typeof supporter.user === 'string') {
      return supporter.user;
    }
    if (typeof supporter.user === 'object') {
      return supporter.user.name;
    }
    return 'Anonymous';
  };
  return (
    <div style={{ marginTop: '72px' }}>
      <FontH3>Latest People Endorsing</FontH3>
      {displaySupporters.map((supporter) => (
        <RecentJoin key={supporter.id} data-cy="supporter-item">
          <Img src={AnonymousIconPurple} alt="share" data-cy="supporter-item-icon"/>
          <JoinWrapper>
            <JoinName data-cy="supporter-item-name">{supporter.user}</JoinName>
            <JoinTime data-cy="supporter-item-time">
              {supporter.type}d {supporter.timeAgo}
            </JoinTime>
            {supporter.message && (
              <Message>
                <Truncate
                  lines={!expanded && lines}
                  ellipsis={
                    <span>
                      ...{' '}
                      <a href="#" onClick={toggleLines}>
                        More
                      </a>
                    </span>
                  }
                  onTruncate={handleTruncate}
                >
                  {supporter.message}
                </Truncate>
                {!truncated && expanded && (
                  <span>
                    {' '}
                    <a href="#" onClick={toggleLines}>
                      Less
                    </a>
                  </span>
                )}
              </Message>
            )}
          </JoinWrapper>
        </RecentJoin>
      ))}
      {candidateSupports.length > lines && (
        <SeeMore onClick={handleShowMore}>
          See {showAll ? 'Less' : 'More'}
        </SeeMore>
      )}
    </div>
  );
}

export default RecentlyJoined;
