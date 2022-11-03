/**
 *
 * FollowButtonWrapper
 *
 */

import React, { useContext, useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { FollowButtonContainerContext } from '/containers/shared/FollowButtonContainer';
import { candidateColor } from '/helpers/candidatesHelper';
import BlackButton, {
  InnerButton,
} from '/components/shared/buttons/BlackButton';
import { getUserCookie } from '/helpers/cookieHelper';
import RegisterComboContainer from '/containers/shared/RegisterComboContainer';
import { candidateRoute } from '/helpers/electionsHelper';

import Row from '../Row';
import AlertDialog from '../AlertDialog';
import Modal from '../Modal';

const Wrapper = styled.div`
  padding: 32px;
  border-radius: 12px;
  min-width: 280px;
  width: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    max-width: 800px;
    width: 80vw;
  }

  input {
    padding: 18px 10px;
    border: 1px solid #c2c2c2;
    width: 100%;
    outline: none;
    border-radius: 4px;
    margin-bottom: 8px;

    &:focus {
      border: 1px solid #000;
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    input {
      margin-bottom: 0;
    }
  }
`;

const Title = styled.h3`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  padding-bottom: 35px;
  margin-bottom: 35px;
  font-size: 17px;
  border-bottom: solid 1px #ececec;
`;

const BottomRow = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-top: 70px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    margin-top: 0;
  }
`;

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
        <form
          id="user-follow-form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
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
            type="submit"
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </form>
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
        <Wrapper>
          <Title>Sign Up</Title>
          <SubTitle>
            Get Good Party updates and track indie campaigns near you!
          </SubTitle>

          <RegisterComboContainer
            afterRegisterCallback={() => {
              followCandidateCallback(candidate.id);
              setShowRegisterModal(false);
            }}
            afterLoginRoute={candidateRoute(candidate)}
          />
          <BottomRow>
            <div>
              Already signed up?{' '}
              <Link href="/?login=true" className="underline">
                <strong>Login</strong>
              </Link>
            </div>
            <LogoWrapper>
              <Image
                src="/images/black-logo.svg"
                width={151}
                height={15}
                alt="GOOD PARTY"
              />
            </LogoWrapper>
          </BottomRow>
        </Wrapper>
      </Modal>
    </>
  );
}

FollowButtonWrapper.propTypes = {};

export default FollowButtonWrapper;
