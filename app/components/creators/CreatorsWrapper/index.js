import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/creators/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';
import { H1 } from 'components/shared/typogrophy/index';
import UniteSection from 'components/creators/shared/UniteSection';

const CreatorsWrapper = () => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeaderWrapper />
      <Wrapper white>
        <MobileHeader />
        <UniteSection />
      </Wrapper>
    </div>
  );
};

CreatorsWrapper.propTypes = {};

export default CreatorsWrapper;
