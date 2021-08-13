/**
 *
 * CopyCodeSection
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { CopyBlock, dracula } from 'react-code-blocks';

const CopyCodeWrapper = styled.div`
  margin-top: 18px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 32px;
  }
`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
  }
`;

function CopyCodeSection({ candidates, candidateSelected = false }) {
  const [selectedCandidate, setSelectedCandidate] = useState(candidateSelected);
  const [candidatesData, setCandidatesData] = useState([]);
  useEffect(() => {
    if (candidates) {
      const data = [];
      candidates.forEach(candidate => {
        data.push(JSON.parse(candidate.data));
      });
      setCandidatesData(data);
    }
  }, [candidates]);

  let urlPrefix = '';
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'goodparty.org'
  ) {
    urlPrefix = 'dev.';
  }

  return (
    <CopyCodeWrapper>
      <ReverseGrid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img
            src="https://assets.goodparty.org/portal/endorse-preview.svg"
            alt="endorse"
            className="image-full"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          {candidates.length > 0 && (
            <Select
              native
              value={selectedCandidate}
              onChange={e => setSelectedCandidate(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <option value="">Select Candidate</option>
              {candidatesData.map(candidate => (
                <option value={candidate.id} key={candidate.id}>
                  {candidate.firstName} {candidate.lastName} | {candidate.race}
                </option>
              ))}
            </Select>
          )}
          {selectedCandidate && (
            <div className="text-left">
              Embed Button (iframe):
              <br />
              <CopyBlock
                text={`<iframe src="https://${urlPrefix}goodparty.org/embed/${selectedCandidate}" style="border:none; height:56px; width:100%"></iframe>`}
                language="html"
                theme={dracula}
                showLineNumbers={false}
              />
              <br />
              <br />
              link:
              <br />
              <CopyBlock
                text={`<a href="https://goodparty.org/embed/redirect/${selectedCandidate}">
  Endorse
</a>`}
                language="html"
                theme={dracula}
                showLineNumbers={false}
              />
              <br />
              <br />
              logo link:
              <br />
              <img src="https://assets.goodparty.org/logo.svg" />
              <br />
              <CopyBlock
                text={`<a href="https://goodparty.org/embed/redirect/29" title="endorse">
  <img src="https://assets.goodparty.org/logo.svg" style="width:200px; height:auto" alt="endorse" />
  </a>`}
                language="html"
                theme={dracula}
                showLineNumbers={false}
              />
            </div>
          )}
        </Grid>
      </ReverseGrid>
    </CopyCodeWrapper>
  );
}

CopyCodeSection.propTypes = {
  candidates: PropTypes.array,
  candidateSelected: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CopyCodeSection;
