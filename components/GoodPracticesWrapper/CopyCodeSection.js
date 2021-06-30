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
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Body11 } from '../shared/typogrophy';
import { PurpleButton } from '../shared/buttons';

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

const Code = styled.div`
  font-size: 13px;
  background-color: #fff;
  padding: 18px;
  margin-top: 24px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: 'Courier New', monospace;
`;

const ButtonText = styled(Body11)`
  padding: 0 18px;
  color: ${({ theme }) => theme.colors.purple};
`;

function CopyCodeSection({ candidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState(false);
  const [copied, setCopied] = useState(false);
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

  return (
    <CopyCodeWrapper>
      <ReverseGrid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            src="images/good-practices/endorse-preview.svg"
            alt="endorse"
            className="image-full"
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
          {selectedCandidate && (
            <>
              <Code>
                &lt;iframe src="https://goodparty.org/embed/
                {selectedCandidate}" style="border:none; height:56px;
                width:100%" &gt;&lt;/iframe&gt;
              </Code>
              <CopyToClipboard
                text={`<iframe src="https://goodparty.org/embed/${selectedCandidate}" style="border:none; height:56px; width:100%" ></iframe>`}
                onCopy={() => setCopied(true)}
              >
                <PurpleButton className="outline" style={{ marginTop: '24px' }}>
                  <ButtonText>COPY CODE</ButtonText>
                </PurpleButton>
              </CopyToClipboard>
              {copied && <Body11 style={{marginTop: '8px'}}>Copied to clipboard</Body11>}
            </>
          )}
        </Grid>
      </ReverseGrid>
    </CopyCodeWrapper>
  );
}

CopyCodeSection.propTypes = {
  candidates: PropTypes.array,
};

export default CopyCodeSection;
