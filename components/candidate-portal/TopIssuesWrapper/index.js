/**
 *
 * TopIssuesWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import { Body13, H3 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../../admin/AdminEditCandidate/JoditEditor';
import { PurpleButton } from '../../shared/buttons';
import PortalContentTopMenu from '../PortalContentTopMenu';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const SectionContent = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
`;
function TopIssue({ topic, issue, addPosition, updatePosition }) {
  const [form, setForm] = useState('');
  const [index, setIndex] = useState(null);
  return (
    <React.Fragment key={topic}>
      <Grid item xs={12} md={6}>
        <strong>{topic}</strong>
      </Grid>
      <Grid item xs={12} md={6}>
        {(issue || []).map((position, pIndex) => (
          <>
            {pIndex !== index && (
              <>
                <span>{position}</span>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setIndex(pIndex);
                    setForm(position);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
            {pIndex === index && (
              <>
                <TextField
                  fullWidth
                  size="small"
                  primary
                  name="Positions"
                  variant="outlined"
                  value={form}
                  onChange={e => setForm(e.target.value)}
                />
                <Box mt={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIndex(null);
                      updatePosition(topic, form, pIndex);
                    }}
                  >
                    Save
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="text"
                    onClick={() => {
                      setIndex(null);
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
            <br />
            <br />
          </>
        ))}
        {index === -1 && (
          <>
            <TextField
              fullWidth
              size="small"
              primary
              name="Positions"
              variant="outlined"
              value={form}
              onChange={e => setForm(e.target.value)}
            />
          </>
        )}
        {index === -1 && (
          <Box mt={1}>
            <Button
              variant="contained"
              onClick={() => {
                setIndex(null);
                addPosition(topic, form);
              }}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="text"
              onClick={() => {
                setIndex(null);
              }}
            >
              Close
            </Button>
          </Box>
        )}
        {index === null && (
          <Button
            variant="text"
            onClick={() => {
              setIndex(-1);
              setForm('');
            }}
          >
            Add Position
          </Button>
        )}
        {/* <TextField
          fullWidth
          name="Positions"
          variant="outlined"
          value={topIssues[issue]}
          onChange={e => addPosition(issue, e.target.value)}
        /> */}
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </React.Fragment>
  );
}
function TopIssuesWrapper({ candidate, candidateUgc, updateUgcCallback }) {
  const [topIssues, setTopIssues] = useState({});
  useEffect(() => {
    setTopIssues({
      HealthCare: [
        'Free Market Healthcare',
        'Medicare for all',
        'Public Option',
      ],
      Guns: ['Defend 2nd Amendment', 'Ban All guns', 'Sensible Gun Control'],
      Taxiation: ['Tax the Rich', 'Cut Taxes for Everyone', 'Flat Tax'],
    });
  }, []);

  const addPosition = (topic, position) => {
    const oldTopIssues = { ...topIssues };
    oldTopIssues[topic].push(position);
    setTopIssues(oldTopIssues);
  };
  const updatePosition = (topic, position, index) => {
    const oldTopIssues = { ...topIssues };
    oldTopIssues[topic][index] = position;
    setTopIssues(oldTopIssues);
  };
  return (
    <PortalPageWrapper>
      <Wrapper>
        <PortalContentTopMenu candidate={candidate} />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">Topic</H3>
          </Grid>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">Positions</H3>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
          {Object.keys(topIssues).map(topic => (
            <TopIssue
              issue={topIssues[topic]}
              topic={topic}
              addPosition={addPosition}
              updatePosition={updatePosition}
            />
          ))}
          {/* <Grid item xs={12}>
            <PurpleButton onClick={() => updateUgcCallback(ugc)} fullWidth>
              SAVE
            </PurpleButton>
          </Grid> */}
        </Grid>
      </Wrapper>
    </PortalPageWrapper>
  );
}

TopIssuesWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidateUgc: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateUgcCallback: PropTypes.func,
};

export default TopIssuesWrapper;
