/**
 *
 * RedirectModal
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

import QueryModal from '../../shared/QueryModal';

const TgpDialog = styled(Dialog)`
  max-width: 475px;
  margin: 0 auto;
  && {
    .MuiDialog-paper {
      position: relative;
      width: 100vw;
      border-radius: 0;
      background-color: ${({ theme }) => theme.colors.purple3};
      padding: 24px;

      box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
        2px -2px 5px rgba(224, 212, 234, 0.2),
        -2px -2px 5px rgba(255, 255, 255, 0.9),
        2px 2px 5px rgba(224, 212, 234, 0.9),
        inset 1px 1px 1px rgba(255, 255, 255, 0.3),
        inset -1px -1px 1px rgba(224, 212, 234, 0.5);
      border-radius: 8px;
    }

    .MuiBackdrop-root {
      background: rgba(240, 236, 243, 0.9);
      backdrop-filter: blur(5px);
    }
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 19px;
  line-height: 25px;
  font-weight: 700;
  margin-bottom: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    margin-bottom: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const RedirectMsg = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray4};
  margin-right: 8px;
`;

const CircleWrapper = styled.div`
  //transform: rotate(90deg);
  position: relative;
  width: 14px;
  height: 14px;
`;

const CircularProgressTop = styled(CircularProgress)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

const CircularProgressBg = styled(CircularProgress)`
  && {
    position: absolute;
    color: ${({ theme }) => theme.colors.purple4};
    top: 0;
    left: 0;
  }
`;

const Number = styled.div`
  margin-top: 1px;
  margin-left: 3px;
  font-size: 11px;
  font-weight: 700;
`;

const Free = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray7};
  line-height: 15px;
  letter-spacing: 0.5px;
  font-style: italic;
  margin-bottom: 12px;
`;

const Logo = styled.img`
  width: 110px;
  height: auto;
`;

function RedirectModal() {
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft || timeLeft < 0) {
      handleClose();
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const router = useRouter();
  const handleClose = () => {
    router.push(window.location.pathname);
  };
  return (
    <TgpDialog
      onClose={handleClose}
      open
      fullWidth
      TransitionProps={{ enter: false, appear: true, timeout: 0 }}
    >
      <Wrapper>
        <Title>This campaign is collecting endorsements using GOOD PARTY</Title>
        <Row>
          <RedirectMsg>You will be redirected soon</RedirectMsg>
          <CircleWrapper>
            <CircularProgressBg variant="static" value={100} size={16} />
            <CircularProgressTop
              variant="static"
              value={timeLeft * 25}
              size={16}
            />
            <Number>{timeLeft}</Number>
          </CircleWrapper>
        </Row>
        <Free>Free Software for free elections</Free>
        <Logo src="/images/new-logo.svg" alt="The Good Party" />
      </Wrapper>
    </TgpDialog>
  );
}

RedirectModal.propTypes = {
  topic: PropTypes.string,
  closeModalCallback: PropTypes.func,
};

export default RedirectModal;
