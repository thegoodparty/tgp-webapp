/**
 *
 * Redirect
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Body11 } from '../shared/typogrophy';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background: ${({ theme }) => theme.colors.purple};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  text-align: center;
  max-width: 475px;
  margin: 0 auto;
  background: rgba(240, 236, 243, 0.9);
  box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
    2px -2px 5px rgba(224, 212, 234, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(224, 212, 234, 0.9),
    inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);
  border-radius: 8px;
  padding: 24px;
`;

const Title = styled.div`
  font-size: 19px;
  line-height: 25px;
  font-weight: 700;
  margin-bottom: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 20px;
  }
`;

const Skip = styled(Body11)`
  text-align: center;
  color: ${({ theme }) => theme.colors.purple};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const RedirectMsg = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray4};
  margin-right: 8px;
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

const timerSeconds = 5;

function RedirectWrapper({ candidate }) {
  const router = useRouter();

  const { id, firstName, lastName } = candidate;
  const [timeLeft, setTimeLeft] = useState(timerSeconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft || timeLeft < 0) {
      handleRedirect();
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

  const handleRedirect = e => {
    if (e) {
      e.preventDefault();
    }
    router.push(`/candidate/${firstName}=${lastName}/${id}`);
  };
  return (
    <Wrapper>
      <Inner>
        <Title>
          This campaign is collecting endorsements for free on GOOD PARTY
        </Title>
        <RedirectMsg>
          You will redirected to{' '}
          <a href="#" onClick={handleRedirect}>
            goodparty.org
          </a>{' '}
          in {timeLeft}
        </RedirectMsg>

        <Skip onClick={handleRedirect}>Click to go now</Skip>
        <Free>Free software for free elections</Free>
        <Logo src="/images/new-logo.svg" alt="The Good Party" />
      </Inner>
    </Wrapper>
  );
}

RedirectWrapper.propTypes = {
  candidate: PropTypes.object,
};

export default RedirectWrapper;
