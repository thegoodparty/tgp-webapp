/**
 *
 * Footer
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import history from 'utils/history';
import styled from 'styled-components';
import { Body9 } from '../typogrophy';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
  &.creatorsFooter {
    background-color: ${({ theme }) => theme.colors.blue};
    margin-bottom: 0;
  }
  &.withNav {
    margin-bottom: 4rem;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: 0;
    }
  }
`;
const InnerWrapper = styled(Body9)`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: auto auto;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray10};
  text-align: center;
  border: solid 1px ${({ theme }) => theme.colors.gray10};

  &.creatorsFooterContent {
    color: ${({ theme }) => theme.creators.colors.gray11};
    border: solid 1px ${({ theme }) => theme.creators.colors.gray11};
  }
`;

function Footer() {
  const [withMobileNav, setWithMobileNav] = useState(true);
  const [isCreatorsNav, setIsCreatorsNav] = useState(false);
  useEffect(() => {
    history.listen(location => {
      updateMobileNav(location);
      updateIsCreatorsNav(location);
    });
    updateMobileNav(window.location);
    updateIsCreatorsNav(window.location);
  }, []);

  const updateMobileNav = location => {
    const { pathname } = location;
    if (
      pathname === '/' ||
      pathname === '/intro/splash' ||
      pathname === '/intro/zip-finder'
    ) {
      setWithMobileNav(false);
    } else {
      setWithMobileNav(true);
    }
  };
  const updateIsCreatorsNav = location => {
    const { pathname } = location;
    if (pathname === '/creators') {
      setIsCreatorsNav(true);
    } else {
      setIsCreatorsNav(false);
    }
  };

  return (
    <Wrapper className={(withMobileNav ? 'withNav' : '') + (isCreatorsNav ? ' creatorsFooter' : '')}>
      <InnerWrapper className={(isCreatorsNav ? ' creatorsFooterContent' : '')}>
        PAID FOR BY THE GOOD PARTY
        <br />
        NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATES COMMITTEE.
      </InnerWrapper>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
