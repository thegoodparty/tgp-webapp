/**
 *
 * Updates
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body19, Body13 } from '../../shared/typogrophy';

const SectionWrapper = styled.div`
  margin-top: 48px;
`;

const SectionHeader = styled(Body19)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;

  &.center {
    color: ${({ theme }) => theme.colors.gray70};
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: normal;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

const YoutubePlayerWrapper = styled.div`
  [data-jodit_iframe_wrapper] {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0 !important;
    width: 100% !important;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &.top {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07),
      0px 0px 12px rgba(0, 0, 0, 0.08), 0px 0px 16px rgba(0, 0, 0, 0.12);
  }
`;

const UpdatedDate = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 19px;
  }
`;

function Updates({ candidate }) {
  const { updates, updatesDates } = candidate;
  const combinedUpdates = updates.map((update, index) => {
    if (updatesDates && updates.length === updatesDates.length) {
      return { html: update, date: updatesDates[index] };
    }
    return { html: update, date: 'February 18, 2021' };
  });
  combinedUpdates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <SectionWrapper>
      <SectionHeader>Updates({updates.length})</SectionHeader>
      {combinedUpdates &&
        combinedUpdates.reverse().map((update, index) => (
          <YoutubePlayerWrapper key={index}>
            <UpdatedDate>{update.date}</UpdatedDate>
            <Body13
              dangerouslySetInnerHTML={{ __html: update.html }}
              style={{ marginBottom: 20 }}
            />
          </YoutubePlayerWrapper>
        ))}
    </SectionWrapper>
  );
}

Updates.propTypes = {
  candidate: PropTypes.object,
};

export default Updates;
