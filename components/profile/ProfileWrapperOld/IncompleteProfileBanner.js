/**
 *
 * IncompleteProfileBanner
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'next/link';

import MaxWidth from './MaxWidth';
import { PurpleButton } from '../../shared/buttons';
import {
  Bar,
  BarBg,
  profileCompletion,
} from '../ProfileSettingsWrapper/IncompleteProfileBanner';

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
  const [completion, setCompletion] = useState(0);
  useEffect(() => {
    setCompletion(profileCompletion(user));
  }, [user]);
  if (completion === 100) {
    return <></>;
  }
  return (
    <Wrapper>
      <MaxWidth>
        Your profile is {completion}% complete
        <BarBg>
          <Bar style={{ width: `${completion}%` }} />
        </BarBg>
        <br />
        <Link href="/profile/settings" passHref>
          <a>
            <PurpleButton className="outline">
              &nbsp;Complete your profile&nbsp;
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
