/**
 *
 * IncompleteProfileBanner
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'next/link';

import { PurpleButton } from '../../shared/buttons';
import MaxWidth from '../ProfileWrapper/MaxWidth';

const Wrapper = styled.section`
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.purple};
  position: relative;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

export const BarBg = styled.div`
  margin: 24px auto 0;
  position: relative;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.gray7};
  border-radius: 12px;
  max-width: 500px;
`;

export const Bar = styled.div`
  position: absolute;
  height: 18px;
  border-radius: 12px;

  background-color: #fff;
  left: 0;
  width: 3%;
  transition: width 0.5s;
`;

export const profileCompletion = user => {
  let completion = 0;
  if (user.name) {
    completion += 12.5;
  }
  if (user.email) {
    completion += 12.5;
  }
  if (user.phone) {
    completion += 12.5;
  }
  if (user.isPhoneVerified) {
    completion += 12.5;
  }
  if (user.isEmailVerified) {
    completion += 12.5;
  }
  if (user.avatar && user.avatar !== '') {
    completion += 12.5;
  }
  if (user.zip) {
    completion += 12.5;
  }
  if (user.hasPassword) {
    completion += 12.5;
  }
  return completion;
};

function IncompleteProfileBanner({ user }) {
  console.log('u', user);
  const [completion, setCompletion] = useState(0);
  useEffect(() => {
    setCompletion(profileCompletion(user));
  }, [user]);
  return (
    <Wrapper>
      <MaxWidth>
        Your profile is {completion}% complete{' '}
        <BarBg>
          <Bar style={{ width: `${completion}%` }} />
        </BarBg>
        <br />
        <Link href="/profile" passHref>
          <a>
            <PurpleButton className="outline">
              &nbsp;Back to profile page&nbsp;
            </PurpleButton>
          </a>
        </Link>
      </MaxWidth>
    </Wrapper>
  );
}

IncompleteProfileBanner.propTypes = {
  user: PropTypes.object,
};

export default IncompleteProfileBanner;
