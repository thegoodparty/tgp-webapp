import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from 'theme/index';
import { Body11 } from '../../shared/typogrophy';

const TwitterIcon = '/images/icons/twitter.svg';
const StyledButton = styled(Button)`
  && {
    border-radius: 8px;
    padding: 16px 4px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: #64ccf1;
    color: #fff;
    position: relative;

    &:hover {
      background-color: #64ccf1;
    }
  }
`;

const StyledBody11 = styled(Body11)`
  color: #fff;
  font-weight: 500;
  padding-left: 16px;
  font-size: 10px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
  }

  &.google {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Icon = styled.img`
  width: 16px;
  height: auto;
  position: absolute;
  left: 10px;
  top: 16px;
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
      <StyledBody11>{children}</StyledBody11>
    </div>
  </StyledButton>
);

TwitterButton.propTypes = {
  clickCallback: PropTypes.func,
  children: PropTypes.string,
};

export default TwitterButton;
