/**
 *
 * FollowModal
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { CandidatesContext } from '/containers/CandidatesPage';
import { getCookie } from '../../helpers/cookieHelper';

const Follow = styled.div`
  background-color: #fff;
  color: #868686;
  border: solid 1px #868686;
  border-radius: 4px;
  padding: 7px 12px;
  font-size: 9px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  min-width: 80px;
  text-align: center;

  &:hover, &.active {
    background-color: #000;
    color: #fff;
  }
  
`;

function TwitterFollowButton({ candidateId }) {
  const { twitterFollowCallback } = useContext(CandidatesContext);
  let followed = getCookie('twitter-followed');
  let isFollowed = false;
  if (followed) {
    followed = JSON.parse(followed);
    if (followed.includes(candidateId)) {
      isFollowed = true;
    }
  }
  return (
    <>
      {isFollowed ? (
        <Follow className="active">FOLLOWING</Follow>
      ) : (
        <Follow
          onClick={() => {
            twitterFollowCallback(candidateId);
          }}
          className="twitter-follow"
          id={`twitter-follow-${candidateId}`}
        >
          FOLLOW
        </Follow>
      )}
    </>
  );
}

export default TwitterFollowButton;
