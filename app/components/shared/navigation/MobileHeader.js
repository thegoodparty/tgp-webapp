import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import BackIcon from '@material-ui/icons/ChevronLeft';
import styled from 'styled-components';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';

import WhiteLogoImg from 'images/white-logo.svg';
import LogoCapsImg from 'images/logo-caps.svg';
import ShareIcon from 'images/icons/share.svg';

// import { ASSETS_BASE } from 'pi/ENV';
import { Body13 } from '../typogrophy';

const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  align-self: center;
  justify-self: center;
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

function MobileHeader({
  showGood = false,
  isGood = false,
  showShare = false,
  whiteBackButton = false,
  goBack,
}) {
  const routeBack = () => {
    goBack();
  };
  return (
    <>
      <Hidden smDown>
        <Spacer />
      </Hidden>
      <Hidden mdUp>
        <Wrapper>
          <BackIconWrapper
            onClick={routeBack}
            className={whiteBackButton ? 'white' : ''}
          >
            <BackIcon />
          </BackIconWrapper>
          {showGood ? (
            <GoodNoGood className={isGood ? 'good' : 'notgood'}>
              {!isGood && 'NOT'} GOOD ENOUGH
            </GoodNoGood>
          ) : (
            <Link to="/party" className="text-center">
              {whiteBackButton ? (
                <Logo src={WhiteLogoImg} alt="The Good Party" />
              ) : (
                <Logo src={LogoCapsImg} alt="The Good Party" />
              )}
            </Link>
          )}
          {showShare ? (
            <img src={ShareIcon} alt="Share" />
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

MobileHeader.propTypes = {
  showGood: PropTypes.bool,
  isGood: PropTypes.bool,
  showShare: PropTypes.bool,
  whiteBackButton: PropTypes.bool,
};

export default connect(
  null,
  { goBack },
)(MobileHeader);
