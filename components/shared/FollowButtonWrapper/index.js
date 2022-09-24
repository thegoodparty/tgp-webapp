/**
 *
 * FollowButtonWrapper
 *
 */

import React, { useContext, useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
//import styled from 'styled-components';

import { FollowButtonContainerContext } from '/containers/shared/FollowButtonContainer';
import { candidateColor } from '/helpers/candidatesHelper';
import BlackButton, {
  InnerButton,
} from '/components/shared/buttons/BlackButton';
import { getUserCookie } from '/helpers/cookieHelper';
import RegisterComboContainer from '/containers/shared/RegisterComboContainer';

import Row from '../Row';
import AlertDialog from '../AlertDialog';
import Modal from '../Modal';
import { candidateRoute } from '../../../helpers/electionsHelper';

function FollowButtonWrapper() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const user = getUserCookie();
  const {
    candidate,
    followCandidateCallback,
    deleteFollowCandidateCallback,
    supports,
    fullWidth = false,
    afterFollowCallback,
    afterUnfollowCallback,
  } = useContext(FollowButtonContainerContext);

  if (!candidate) {
    return <></>;
  }
  const isSupported = supports && supports[candidate.id];

  const brightColor = candidateColor(candidate);

  const handleClick = () => {
    if (user) {
      followCandidateCallback(candidate.id);
      console.log('calling after follow', afterFollowCallback);
      if (afterFollowCallback) {
        afterFollowCallback();
      }
    } else {
      setShowRegisterModal(true);
    }
  };

  const handleDelete = () => {
    if (user) {
      deleteFollowCandidateCallback(candidate.id);
      if (afterUnfollowCallback) {
        afterUnfollowCallback();
      }
    }
    setShowDeleteAlert(false);
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
          onClick={() => setShowDeleteAlert(true)}
          id="candidate-follow-button"
          dataCy="candidate-follow-btn"
          className="outlined"
          fullWidth={fullWidth}
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
          fullWidth={fullWidth}
        >
          <InnerButton>FOLLOW</InnerButton>
        </BlackButton>
      )}
      <AlertDialog
        open={showDeleteAlert}
        handleClose={() => setShowDeleteAlert(false)}
        title={'Unfollow?'}
        ariaLabel={'Unfollow?'}
        description={'Are you sure you want to unfollow this candidate?'}
        handleProceed={handleDelete}
      />
      <Modal
        closeModalCallback={() => setShowRegisterModal(false)}
        open={showRegisterModal}
      >
        <RegisterComboContainer
          afterRegisterCallback={() => {
            followCandidateCallback(candidate.id);
            setShowRegisterModal(false);
          }}
          afterLoginRoute={candidateRoute(candidate)}
        />
      </Modal>
    </>
  );
}

FollowButtonWrapper.propTypes = {};

export default FollowButtonWrapper;
