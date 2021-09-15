/**
 *
 * RegisterBannerWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Body13 } from '../typogrophy';

const Wrapper = styled.div`
  padding: 8px 0;
  background-color: red;
  color: #fff;
  a {
    color: #fff;
    font-weight: 600;
  }
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  text-align: center;
`;

function RegisterBannerWrapper() {
  return (
    <Wrapper>
      <Link href="/register/confirm" passHref>
        <a>
          <ContentWrapper>Please verify your account</ContentWrapper>
        </a>
      </Link>
    </Wrapper>
  );
}

RegisterBannerWrapper.propTypes = {
  count: PropTypes.number,
  showBanner: PropTypes.bool,
  blocName: PropTypes.string,
};

export default RegisterBannerWrapper;
