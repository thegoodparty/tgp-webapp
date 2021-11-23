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
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ColorPicker from 'material-ui-color-picker';

import { CopyBlock, dracula } from 'react-code-blocks';

const CopyCodeWrapper = styled.div`
  margin-top: 18px;
  text-align: left;
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
  const [type, setType] = React.useState('endorse-btn');
  const [widthType, setWidthType] = React.useState('fluid');
  const [width, setWidth] = React.useState(50);
  const [borderColor, setBorderColor] = React.useState('#5C00C7');
  const [buttonText, setButtonText] = React.useState('Endorse');
  const [bgColor, setBgColor] = React.useState('#5C00C7');
  const [textColor, setTextColor] = React.useState('#FFF');

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
  useEffect(() => {
    if (widthType === 'fixed') {
      setWidth(100);
    } else {
      setWidth(50);
    }
  }, [widthType]);
  let domain = 'https://goodparty.org';
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'goodparty.org'
  ) {
    if (window.location.hostname === 'localhost') {
      domain = 'http://localhost:4000';
    } else {
      domain = 'https://dev.goodparty.org';
    }
  }
  const embedButton =
    type === 'endorse-btn'
      ? `
  <a href="${domain}/embed/redirect/${selectedCandidate}?type=endorse" 
    style="
      width: ${width}%; 
      text-decoration: none; 
      font-size: 16px; 
      color: ${textColor}; 
      padding: 12px 3px; 
      justify-content: center; 
      border-radius: 8px; 
      text-transform: uppercase; 
      display: flex; 
      align-items: center; 
      border: 2px solid ${borderColor}; 
      background-color: ${bgColor};
    ">
    <img src="https://goodparty.org/images/white-heart.svg" style="margin-right:8px;">
    ${buttonText}
  </a>
  `
      : `
  <a 
    href="${domain}/embed/redirect/${selectedCandidate}?type=logo" 
    title="endorse"
  >
    <img 
      src="https://assets.goodparty.org/logo.svg" 
      style="width:${width}%; height:auto" 
      alt="endorse" 
    />
  </a>
      `;
  return (
    <CopyCodeWrapper>
      <ReverseGrid container spacing={3}>
        {/* <Grid item xs={12} md={5}>
          <img
            src="https://assets.goodparty.org/portal/endorse-preview.svg"
            alt="endorse"
            className="image-full"
          />
        </Grid> */}
        <Grid item xs={12} md={12}>
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
            <>
              <Box mt={2} mb={2}>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  onChange={e => setType(e.target.value)}
                >
                  <option value="endorse-btn">Endorse Button</option>
                  <option value="logo-btn">Small Logo-only Button</option>
                </Select>
              </Box>
              <Grid container spacing={2}>
                <Grid item xd={12} md={4}>
                  <InputLabel>Size</InputLabel>
                  <br />
                  <Box mb={1}>
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={widthType}
                      exclusive
                      onChange={(event, newWidthType) =>
                        setWidthType(newWidthType)
                      }
                    >
                      <ToggleButton value="fluid">Fluid Width</ToggleButton>
                      <ToggleButton value="fixed">Fixed Width</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                  {widthType === 'fluid' && (
                    <TextField
                      id="outlined-adornment-weight"
                      value={width}
                      size="small"
                      onChange={ev => setWidth(ev.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      aria-describedby="outlined-weight-helper-text"
                      variant="outlined"
                    />
                  )}
                </Grid>
                {type === 'endorse-btn' && (
                  <>
                    <Grid item xd={12} md={4}>
                      <InputLabel>Colors</InputLabel>
                      <br />
                      <ColorPicker
                        name="color"
                        defaultValue="#000"
                        value={bgColor}
                        // value={this.state.color} - for controlled component
                        onChange={color => setBgColor(color)}
                        label="Button"
                        style={{ marginBottom: 10 }}
                      />
                      <br />
                      <ColorPicker
                        name="color"
                        defaultValue="#000"
                        value={borderColor}
                        // value={this.state.color} - for controlled component
                        onChange={color => setBorderColor(color)}
                        label="Borders"
                        style={{ marginBottom: 10 }}
                      />
                      <br />
                      <ColorPicker
                        name="color"
                        defaultValue="#000"
                        value={textColor}
                        onChange={color => setTextColor(color)}
                        label="Text"
                        style={{ marginBottom: 10 }}
                      />
                    </Grid>
                    <Grid item xd={12} md={4}>
                      <InputLabel>Button Text</InputLabel>
                      <br />
                      <TextField
                        size="small"
                        id="outlined-basic"
                        // label="Outlined"
                        variant="outlined"
                        value={buttonText}
                        onChange={ev => setButtonText(ev.target.value)}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <br />
              <Grid container alignItems="center">
                <Grid item xs={12} md={4}>
                  <InputLabel>Preview: </InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div dangerouslySetInnerHTML={{ __html: embedButton }} />
                </Grid>
                <Grid item xs={12}>
                  <Box mt={2}>
                    <CopyBlock
                      text={embedButton}
                      language="html"
                      theme={dracula}
                      showLineNumbers={false}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
          {/* {selectedCandidate && (
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
          )} */}
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
