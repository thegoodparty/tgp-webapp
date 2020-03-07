import React, { userState } from 'react';
import Link from 'next/link';
import Hidden from '@material-ui/core/Hidden';
import BackIcon from '@material-ui/icons/ChevronLeft';
import styled from 'styled-components';
import Router from 'next/router';
import { ASSETS_BASE } from '~/api/ENV';
import { Body13 } from '../typogrophy';

const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 40%;
  height: auto;
`;

const BackIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  & > svg {
    font-size: 30px;
  }
  &.hidden {
    opacity: 0;
  }
  &.white {
    color: #fff;
  }
`;

const BackIconWrapperHidden = styled.div`
  opacity: 0;
`;

const Spacer = styled.div`
  height: 40px;
`;

const GoodNoGood = styled(Body13)`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 500;

  &.good {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export default function MobileHeader({
  showGood = false,
  isGood = false,
  showShare = false,
  whiteBackButton = false,
}) {
  const goBack = () => {
    Router.back();
  };
  return (
    <>
      <Hidden smDown>
        <Spacer />
      </Hidden>
      <Hidden mdUp>
        <Wrapper>
          <BackIconWrapper
            onClick={goBack}
            className={whiteBackButton ? 'white' : ''}
          >
            <BackIcon />
          </BackIconWrapper>
          {showGood ? (
            <GoodNoGood className={isGood ? 'good' : 'notgood'}>
              {!isGood && 'NOT'} GOOD ENOUGH
            </GoodNoGood>
          ) : (
            <Link href="/">
              {whiteBackButton ? (
                <Logo src={`${ASSETS_BASE}/white-logo.svg`} />
              ) : (
                <Logo src={`${ASSETS_BASE}/logo-caps.svg`} />
              )}
            </Link>
          )}
          {showShare ? (
            <img src={`${ASSETS_BASE}/icons/share.svg`} />
          ) : (
            <BackIconWrapperHidden>
              <BackIcon />
            </BackIconWrapperHidden>
          )}
        </Wrapper>
      </Hidden>
    </>
  );
}
