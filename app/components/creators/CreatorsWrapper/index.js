import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { H1 } from 'components/shared/typogrophy/index';

const CreatorsWrapper = () => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <H1>Creators of The World, Unite!</H1>
      </Wrapper>
    </div>
  );
};

CreatorsWrapper.propTypes = {};

export default CreatorsWrapper;
