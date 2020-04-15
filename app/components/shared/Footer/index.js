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
  background-color: ${({ theme }) => theme.colors.gray9};
  &.withNav {
    margin-bottom: 4rem;
  }
`;
const InnerWrapper = styled(Body9)`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 16px;
  color: #000;
  text-align: center;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }
`;

function Footer() {
  const [withMobileNav, setWithMobileNav] = useState(false);
  useEffect(() => {
    // window.addEventListener('popstate', () => {
    //   console.log('popstate')
    //   const { pathname } = window.location;
    //   if (pathname === '/' || pathname === '/intro/splash') {
    //     setWithMobileNav(true);
    //   }
    //   setWithMobileNav(false);
    // });
    history.listen((location, action) => {
      console.log(location, action);
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
    });
  }, []);

  console.log('withMob', withMobileNav);

  return (
    <Wrapper className={withMobileNav ? 'withNav' : ''}>
      <InnerWrapper>
        Paid for by The Good Party.
        <br />
        Not authorized by any candidate or candidate’s committee
      </InnerWrapper>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
