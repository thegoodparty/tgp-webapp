/**
 *
 * RegisterBannerWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Body13 } from '../typogrophy';

const Wrapper = styled.div`
  margin-bottom: 18px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 80px;
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 16px;
  border: solid 1px ${({ theme }) => theme.colors.green};
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Spacer = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 40px;
    display: block;
  }
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

function RegisterBannerWrapper({ count, showBanner }) {
  return (
    <>
      {showBanner ? (
        <Wrapper>
          <Link to="/you/register">
            <ContentWrapper>
              <Body13>
                You have joined {count} candidate voting bloc
                {count > 1 ? 's' : ''}. <br />
                <Blue>Sign-in to save your choices </Blue> &amp; be counted!
              </Body13>
              <ChevronRightIcon
                style={{ marginLeft: '30px', color: '#CDCDCD' }}
              />
            </ContentWrapper>
          </Link>
        </Wrapper>
      ) : (
        <Spacer />
      )}
    </>
  );
}

RegisterBannerWrapper.propTypes = {
  count: PropTypes.number,
  showBanner: PropTypes.bool,
};

export default RegisterBannerWrapper;
