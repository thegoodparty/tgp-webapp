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
  background-color: ${({ theme }) => theme.colors.grayE};
  padding: 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
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
  color: ${({ theme }) => theme.colors.gray9};
  text-align: center;
  border: solid 1px ${({ theme }) => theme.colors.gray9};
`;

function Footer() {
  const [withMobileNav, setWithMobileNav] = useState(true);
  useEffect(() => {
    history.listen(location => {
      updateMobileNav(location);
    });
    updateMobileNav(window.location);
  }, []);

  const updateMobileNav = location => {
    const { pathname } = location;
    if (
      pathname === '/' ||
      pathname === '/intro/splash' ||
      pathname === '/intro/three-steps' ||
      pathname === '/intro/zip-finder'
    ) {
      setWithMobileNav(false);
    } else {
      setWithMobileNav(true);
    }
  };

  return (
    <Wrapper className={withMobileNav ? 'withNav' : ''}>
      <InnerWrapper>
        PAID FOR BY THE GOOD PARTY
        <br />
        NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATES COMMITTEE.
      </InnerWrapper>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
