/**
 *
 * IncompleteProfileBanner
 *
 */

import React from 'react';
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

function IncompleteProfileBanner({ user }) {
  let completion = 0;
  if (user.name) {
    completion += 25;
  }
  if (user.email) {
    completion += 25;
  }
  if (user.phone) {
    completion += 25;
  }
  if (user.zip) {
    completion += 25;
  }

  return (
    <Wrapper>
      <MaxWidth>
        Your profile is {completion}% complete{' '}
        {completion === 100 && (
          <span role="img" aria-label="100%">
            💯
          </span>
        )}
        <br />
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
