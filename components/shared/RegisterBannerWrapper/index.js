/**
 *
 * RegisterBannerWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { BiRightArrowCircle } from 'react-icons/bi';
import { AiFillWarning } from 'react-icons/ai';
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

const ContentWrapper = styled(Body13)`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

function RegisterBannerWrapper({ user }) {
  const hasPhone = !!user.phone;
  let returnUrl = '';
  if (typeof window !== 'undefined') {
    returnUrl = window.location.pathname;
  }
  return (
    <Wrapper>
      <Link href={`/register/confirm?returnUrl=${returnUrl}`} passHref>
        <a>
          <ContentWrapper>
            <AiFillWarning size={20} /> &nbsp;
            <Underline>
              Verify your {hasPhone ? 'phone number' : 'email'}
            </Underline>
            , so your actions count! &nbsp;
            <BiRightArrowCircle size={20} />
          </ContentWrapper>
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
