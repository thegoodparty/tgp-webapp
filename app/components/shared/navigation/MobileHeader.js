import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import BackIcon from '@material-ui/icons/ChevronLeft';
import styled from 'styled-components';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import history from 'utils/history';

import RegisterBannerContainer from 'containers/shared/RegisterBannerContainer';

import WhiteLogoImg from 'images/white-logo.svg';
import LogoCapsImg from 'images/logo-caps.svg';
import ShareIcon from 'images/icons/share.svg';
import { uuidUrl } from 'helpers/userHelper';
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
  cursor: pointer;
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
  dispatch,
  showGood = false,
  isGood = false,
  showShare = false,
  whiteBackButton = false,
  user,
}) {
  const routeBack = () => {
    dispatch(goBack());
  };

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const url = uuidUrl(user);

  const nativeShare = () => {
    navigator
      .share({
        title: 'The Good Party',
        text: 'Check out The Good Party!',
        url,
      })
      .then(() => console.log('Successful share'));
  };
  const showBack = history && history.length > 1;

  return (
    <Hidden mdUp>
      <Wrapper>
        {showBack ? (
          <BackIconWrapper
            onClick={routeBack}
            className={whiteBackButton ? 'white' : ''}
          >
            <BackIcon />
          </BackIconWrapper>
        ) : (
          <div>&nbsp;</div>
        )}
        {showGood ? (
          <GoodNoGood className={isGood ? 'good' : 'notgood'}>
            {!isGood ? 'NOT GOOD ENOUGH' : 'GOOD OPTION'}
          </GoodNoGood>
        ) : (
          <Link to="/home" className="text-center">
            {whiteBackButton ? (
              <Logo src={WhiteLogoImg} alt="The Good Party" data-cy="logo" />
            ) : (
              <Logo src={LogoCapsImg} alt="The Good Party" data-cy="logo" />
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
  dispatch: PropTypes.func.isRequired,
  showGood: PropTypes.bool,
  isGood: PropTypes.bool,
  showShare: PropTypes.bool,
  whiteBackButton: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(MobileHeader);
