import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { PurpleButton } from '../shared/buttons';
import { getUserCookie } from '../../helpers/cookieHelper';

const StyledBody = styled.div`
  color: #fff;
  padding: 0 18px;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 16px;
    line-height: 20px;
    padding: 0 32px;
  }
`;

const JoinUsButton = ({ style = {}, label = 'Sign Up' }) => {
  const user = getUserCookie();
  return (
    <Link href={user ? '/profile' : '/register'} passHref>
      <a>
        <PurpleButton style={style}>
          <StyledBody>{label}</StyledBody>
        </PurpleButton>
      </a>
    </Link>
  );
};

JoinUsButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
};

export default JoinUsButton;
