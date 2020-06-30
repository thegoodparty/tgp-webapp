/**
 *
 * FirstStep
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Fade,
  FormControlLabel,
  Checkbox,
  Grid,
  Hidden,
} from '@material-ui/core';
import { Body18 } from '../../typography';
import { useWindowSize } from 'customHooks/useWindowSize';
import { BlueButton, GrayButton } from '../../buttons';
import { MultipleSelect } from 'react-select-material-ui';
import {
  BodyWrapper,
  FooterWrapper,
  OverlayModal,
  Title,
  FormText,
  ProjectFormLabel,
  ProjectFormControl,
  ProjectFormHelperText,
  ProjectFormControlHeader,
  CloseIcon,
} from '../shared';

const TopicSelect = styled(MultipleSelect)`
  && {
    & > div > div {
      border: none;
      background: none;
      &:hover {
        border: none;
        background: none;
      }
    }
    border: 1px solid ${({ theme }) => theme.creators.colors.borderGray};
    background: ${({ theme }) => theme.creators.colors.formColor};
    border-radius: 4px;
    padding: 0.4rem 0.7rem;
    margin-top: 0.8rem;
    &:hover {
      border-color: black;
    }
  }
`;

const CollaboratorCheckControl = styled(FormControlLabel)`
  && {
    margin-bottom: 1.5rem;
  }
`;
function FirstStep({
  open,
  toggleModal,
  title,
  summary,
  topics,
  collaborator,
  closeModal,
  updateProject,
}) {
  const [width, height] = useWindowSize();
  return (
    <OverlayModal
      key="first-modal"
      open={open}
      onClose={closeModal}
      aria-labelledby="first-modal"
      aria-describedby="first-modal-description"
    >
      <Fade in={open}>
        <BodyWrapper>
          <CloseIcon onClick={closeModal} />
          <Title>List Project</Title>
          <Grid container>
            <Grid item xs={12}>
              <ProjectFormControl
                fullWidth
                required
                error={title === ''}
                component="fieldset"
              >
                <ProjectFormControlHeader>
                  <ProjectFormLabel>Project Title</ProjectFormLabel>
                  <ProjectFormHelperText>Required</ProjectFormHelperText>
                </ProjectFormControlHeader>
                <FormText
                  error={title === ''}
                  variant="outlined"
                  placeholder="e.g. Graphics for the native iOS and Android app"
                  onChange={ev => updateProject(ev.target.value, 'title')}
                  autoFocus
                />
              </ProjectFormControl>
            </Grid>
            <Grid item xs={12}>
              <ProjectFormControl
                fullWidth
                required
                error={summary === ''}
                component="fieldset"
              >
                <ProjectFormControlHeader>
                  <ProjectFormLabel>Project Summary</ProjectFormLabel>
                  <ProjectFormHelperText>Required</ProjectFormHelperText>
                </ProjectFormControlHeader>
                <FormText
                  multiline
                  error={summary === ''}
                  rows={width > 768 ? 7 : 4}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Brief description of your project.
  Mention if you are looking for collaborators."
                  onChange={ev => updateProject(ev.target.value, 'summary')}
                />
              </ProjectFormControl>
            </Grid>
            <Grid item xs={12}>
              <ProjectFormControl fullWidth component="fieldset">
                <ProjectFormControlHeader>
                  <ProjectFormLabel>Project Summary</ProjectFormLabel>
                </ProjectFormControlHeader>
                <TopicSelect
                  className="select-comp"
                  options={topics}
                  values={topics}
                  variant="outlined"
                  onChange={topics => updateProject(topics, 'topics')}
                  SelectProps={{
                    isCreatable: true,
                    msgNoOptionsAvailable: 'Enter Topics',
                    msgNoOptionsMatchFilter: 'Enter Topics',
                  }}
                  placeholder="Add up to three topics"
                />
              </ProjectFormControl>
            </Grid>
            <Grid item xs={12} className="text-left">
              <CollaboratorCheckControl
                control={
                  <Checkbox
                    checked={collaborator}
                    color="primary"
                    onChange={ev =>
                      updateProject(ev.target.checked, 'collaborator')
                    }
                    name="collaborator"
                  />
                }
                label="I am seeking collaborators for this project"
              />
            </Grid>
          </Grid>

          <FooterWrapper>
            <GrayButton variant="contained" onClick={closeModal}>
              Cancel
            </GrayButton>
            <Hidden xsDown>
              <BlueButton
                variant="contained"
                color="primary"
                onClick={toggleModal}
              >
                Next:Add links & Media
              </BlueButton>
            </Hidden>
            <Hidden smUp>
              <BlueButton
                variant="contained"
                color="primary"
                onClick={toggleModal}
              >
                Next
              </BlueButton>
            </Hidden>
          </FooterWrapper>
        </BodyWrapper>
      </Fade>
    </OverlayModal>
  );
}

FirstStep.propTypes = {
  open: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  summary: PropTypes.string,
  topics: PropTypes.array,
  collaborator: PropTypes.bool,
  closeModal: PropTypes.func,
  updateProject: PropTypes.func,
};

export default FirstStep;
