/**
 *
 * MobileRecentlySupport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { Element } from 'react-scroll';

import NotFound from 'containers/shared/NotFoundPage';

import RecentlyJoined from './RecentlyJoined';

const SectionWrapper = styled.div`
  margin-top: 48px;
`;

function MobileRecentlySupport({ candidate, candidateSupports, total }) {
  if (!candidate) {
    return <NotFound />;
  }

  return (
    <Hidden mdUp>
      <SectionWrapper>
        <Element name="recently-all">
          <RecentlyJoined candidateSupports={candidateSupports} total={total} />
        </Element>
      </SectionWrapper>
    </Hidden>
  );
}

MobileRecentlySupport.propTypes = {
  candidate: PropTypes.object,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  total: PropTypes.number,
};

export default MobileRecentlySupport;
