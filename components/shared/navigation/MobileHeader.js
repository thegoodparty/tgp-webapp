import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import RegisterBannerContainer from 'containers/shared/RegisterBannerContainer';
import UserAvatar from '../UserAvatar';

import { Body9, Body14 } from '../typogrophy';
import { PurpleButton } from '../buttons';

const Wrapper = styled.div`
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  justify-content: space-between;
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.lg}) {
    padding: 0 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.sm}) {
    padding: 0 18px;
  }
`;

const Logo = styled.img`
  height: 12px;
  align-self: center;
  justify-self: center;
`;

const AuthButtonWrapper = styled.div`
  display: flex;
  padding: 18px 0px;
  margin-top: 18px;
  border-top: solid 1px rgba(12, 11, 49, 0.16);
  align-items: center;
  justify-content: space-between;
`;
const MenuIconButton = styled(MenuIcon)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2rem;
  }
`;
const CloseIconButton = styled(CloseIcon)`
  && {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2rem;
  }
`;
const MenuItemWrapper = styled(Drawer)`
  && {
    .MuiDrawer-paper {
      height: 100%;
      width: 100%;
    }
  }
`;
const PushMenuWrapper = styled.div`
  padding: 24px 18px 18px;
`;
const AvatarWrapper = styled.div`
  height: 80px;
  cursor: pointer;
  display: flex;
`;

const PushAvatarWrapper = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
  text-transform: uppercase;
  border-bottom: solid 1px rgba(12, 11, 49, 0.16);
  padding-bottom: 18px;
`;

const ShareWrapper = styled.div`
  width: 40px;
  text-align: right;
`;

const Share = styled.img`
  height: 18px;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  width: 40px;
`;

const PushMenuLink = styled.div`
  padding: 12px 0;
  line-height: 22px;
  font-size: 16px;
`;

const ButtonInner = styled.div`
  padding: 6px 0;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;

function MobileHeader({ user }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleShare = () => {
    router.query.share = 'true';
    router.push(router);
  };

  return (
    <Hidden mdUp>
      <Wrapper>
        <LinkContainer>
          <MenuIconButton onClick={() => setOpen(true)} />
        </LinkContainer>
        <Link href="/" className="text-center">
          <Logo
            src="/images/new-logo.svg"
            alt="The Good Party"
            data-cy="logo"
          />
        </Link>
        {user?.name ? (
          <Link href="/profile" passHref>
            <a>
              <AvatarWrapper>
                <UserAvatar user={user} />
              </AvatarWrapper>
            </a>
          </Link>
        ) : (
          <ShareWrapper>
            <Share
              src="/images/icons/share-icon.svg"
              alt="Share"
              onClick={handleShare}
            />
          </ShareWrapper>
        )}
      </Wrapper>
      <MenuItemWrapper anchor="left" open={open} onClose={() => setOpen(false)}>
        <PushMenuWrapper>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <CloseIconButton onClick={() => setOpen(false)} />
            </Grid>
            <Grid item xs={6}>
              <div className="text-center">
                <Link href="/" className="text-center" passHref>
                  <a>
                    <Logo
                      src="/images/new-logo.svg"
                      alt="The Good Party"
                      data-cy="logo"
                    />
                  </a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={3}>
              &nbsp;
            </Grid>
          </Grid>

          <PushMenuLink style={{ marginTop: '40px' }}>
            <Link
              href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
              passHref
            >
              <a>How crowd-voting works</a>
            </Link>
          </PushMenuLink>
          <PushMenuLink>
            <Link href="/about" passHref>
              <a>About Good Party</a>
            </Link>
          </PushMenuLink>
          <PushMenuLink>
            <Link href="/candidates" passHref>
              <a>Meet the candidates</a>
            </Link>
          </PushMenuLink>
          <PushMenuLink>
            <Link href="/faqs" passHref>
              <a>FAQs</a>
            </Link>
          </PushMenuLink>

          <AuthButtonWrapper className={!user?.name && 'auth-button'}>
            {user?.name ? (
              <Link href="/profile" className="text-center" passHref>
                <a style={{ width: '100%' }}>
                  <PushAvatarWrapper>
                    <UserAvatar user={user} />
                    <div style={{ marginLeft: 6 }} className="menu-items">
                      {user.name}
                    </div>
                  </PushAvatarWrapper>
                </a>
              </Link>
            ) : (
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <PushMenuLink className="text-center">
                    <Link href={`${router.asPath}?register=true`} passHref>
                      <a>
                        <PurpleButton fullWidth>
                          <ButtonInner>SIGN UP</ButtonInner>
                        </PurpleButton>
                      </a>
                    </Link>
                  </PushMenuLink>
                </Grid>
                <Grid item xs={6}>
                  <PushMenuLink className="text-center">
                    <Link href="/login" className="text-center" passHref>
                      <a>LOG IN</a>
                    </Link>
                  </PushMenuLink>
                </Grid>
              </Grid>
            )}
          </AuthButtonWrapper>
        </PushMenuWrapper>
      </MenuItemWrapper>

      <RegisterBannerContainer />
    </Hidden>
  );
}

MobileHeader.propTypes = {
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
