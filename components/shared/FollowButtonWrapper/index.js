/**
 *
 * FollowButtonWrapper
 *
 */

import React, { useContext } from 'react';
import { ImCheckmark } from 'react-icons/im';

import { FollowButtonContainerContext } from '/containers/shared/FollowButtonContainer';
import { candidateColor } from '/helpers/candidatesHelper';
import BlackButton, {
  InnerButton,
} from '/components/shared/buttons/BlackButton';
import { getUserCookie } from '/helpers/cookieHelper';

import styled from 'styled-components';
import Row from '../Row';

const Wrapper = styled.div`
  padding: 20px 0;
  font-weight: 900;
`;
function FollowButtonWrapper() {
  const user = getUserCookie();
  const {
    candidate,
    followCandidateCallback,
    deleteFollowCandidateCallback,
    supports,
  } = useContext(FollowButtonContainerContext);
  if (!candidate) {
    return <></>;
  }
  const isSupported = supports && supports[candidate.id];

  const brightColor = candidateColor(candidate);

  const handleClick = () => {
    if (user) {
      followCandidateCallback(candidate.id);
    } else {
      alert('register here');
    }
  };

  const handleDelete = () => {
    if (user) {
      deleteFollowCandidateCallback(candidate.id);
    }
  };
  return (
    <>
      {isSupported ? (
        <BlackButton
          style={{
            color: brightColor,
            borderColor: brightColor,
            marginTop: '12px',
          }}
          onClick={handleDelete}
          id="candidate-follow-button"
          dataCy="candidate-follow-btn"
          className="outlined"
        >
          <InnerButton>
            <Row>
              <ImCheckmark /> <div>&nbsp; FOLLOWING</div>
            </Row>
          </InnerButton>
        </BlackButton>
      ) : (
        <BlackButton
          style={{
            backgroundColor: brightColor,
            borderColor: brightColor,
            marginTop: '12px',
          }}
          onClick={handleClick}
          id="candidate-follow-button"
          dataCy="candidate-follow-btn"
        >
          <InnerButton>FOLLOW</InnerButton>
        </BlackButton>
      )}
    </>
  );
}

FollowButtonWrapper.propTypes = {};

export default FollowButtonWrapper;
