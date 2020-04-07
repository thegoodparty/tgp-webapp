import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import BackIcon from '@material-ui/icons/ChevronLeft';
import styled from 'styled-components';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';

import RegisterBannerContainer from 'containers/shared/RegisterBannerContainer';

import WhiteLogoImg from 'images/white-logo.svg';
import LogoCapsImg from 'images/logo-caps.svg';
import ShareIcon from 'images/icons/share.svg';

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
  user,
}) {
  const routeBack = () => {
    goBack();
  };

  const canShare = typeof navigator !== 'undefined' && navigator.share;

  const url =
    user && user.uuid
      ? `https://www.thegoodparty.org?u=${user.uuid}`
      : 'https://www.thegoodparty.org';

  const nativeShare = () => {
    navigator
      .share({
        title: 'The Good Party',
        text: 'Check out The Good Party!',
        url,
      })
      .then(() => console.log('Successful share'));
  };

  return (
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
        {showShare && canShare ? (
          <img src={ShareIcon} alt="Share" onClick={nativeShare} />
        ) : (
          <BackIconWrapperHidden>
            <BackIcon />
          </BackIconWrapperHidden>
        )}
      </Wrapper>
      <RegisterBannerContainer />
    </Hidden>
  );
}

MobileHeader.propTypes = {
  showGood: PropTypes.bool,
  isGood: PropTypes.bool,
  showShare: PropTypes.bool,
  whiteBackButton: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default connect(
  null,
  { goBack },
)(MobileHeader);
