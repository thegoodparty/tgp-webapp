import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import CreatorsHeader from 'containers/creators/CreatorsHeader';
import { H1 } from 'components/shared/typogrophy/index';
import RegisterBannerWrapper from 'components/shared/RegisterBannerWrapper';
const Spacer = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 7rem;
    display: block;
  }
`;
const CreatorsWrapper = () => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeader />
      <Spacer />
      <Wrapper white creators>
        <MobileHeader />
        <H1>Creators of The World, Unite!</H1>
      </Wrapper>
    </div>
  );
};

CreatorsWrapper.propTypes = {};

export default CreatorsWrapper;
