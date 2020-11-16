import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TwitterIcon from 'public/images/icons/twitter.svg';
import tgpTheme from 'theme/index';
import { Body13 } from '../../shared/typogrophy';

const StyledButton = styled(Button)`
  && {
    margin-top: 18px;
    border-radius: 30px;
    padding: 12px 32px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: #64ccf1;
    color: #fff;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08),
      0px 0px 16px rgba(0, 0, 0, 0.12);

    &:hover {
      background-color: #64ccf1;
    }
  }
`;

const StyledBody13 = styled(Body13)`
  color: #fff;
  font-weight: 500;

  &.google {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Icon = styled.img`
  width: 18px;
  height: auto;
  position: absolute;
  left: 21px;
  top: 13px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 20px;
    top: 16px;
  }
`;

const TwitterButton = ({ clickCallback, children }) => (
  <StyledButton
    fullWidth
    onClick={clickCallback}
    data-cy="twitter-social-login"
  >
    <div>
      <Icon src={TwitterIcon} alt="" />
      <StyledBody13>{children}</StyledBody13>
    </div>
  </StyledButton>
);

TwitterButton.propTypes = {
  clickCallback: PropTypes.func,
  children: PropTypes.string,
};

export default TwitterButton;
