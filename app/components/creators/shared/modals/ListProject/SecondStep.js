/**
 *
 * SecondStep
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fade, Grid } from '@material-ui/core';
import { Body15 } from '../../typography';
import { BlueButton, GrayButton } from '../../buttons';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  BodyWrapper,
  OverlayModal,
  FooterWrapper,
  Title,
  FormText,
  ProjectFormLabel,
  ProjectFormControl,
  ProjectFormHelperText,
  ProjectFormControlHeader,
} from '../shared';

const AddProjectLink = styled(Body15)`
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  margin-top: 0.8rem;
  &:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

const ProjectImagesDropzoneWrapper = styled.div`
  && {
    & > div {
      border: 1px solid ${({ theme }) => theme.creators.colors.borderGray};
      background: ${({ theme }) => theme.creators.colors.formColor};
      margin-top: 0.8rem;
      border-radius: 4px;
      &:active {
        outline: none;
      }
    }
  }
`;

function SecondStep({
  open,
  toggleModal,
  video,
  images,
  links,
  closeModal,
  updateProject,
  addLink,
}) {
  return (
    <>
      <OverlayModal
        open={true}
        onClose={closeModal}
        key="second-modal"
        aria-labelledby="second-modal-title"
        aria-describedby="second-modal-description"
      >
        <Fade in={open}>
          <BodyWrapper>
            <Title>List Project</Title>
            <Grid container>
              <Grid item xs={12}>
                <ProjectFormControl fullWidth component="fieldset">
                  <ProjectFormControlHeader>
                    <ProjectFormLabel>Project Video</ProjectFormLabel>
                  </ProjectFormControlHeader>
                  <FormText
                    variant="outlined"
                    placeholder="YouTube or Vimeo link"
                    onChange={ev => updateProject(ev.target.value, 'video')}
                    autoFocus
                  />
                </ProjectFormControl>
              </Grid>
              <Grid item xs={12}>
                <ProjectFormControl fullWidth component="fieldset">
                  <ProjectFormControlHeader>
                    <ProjectFormLabel>Project Images</ProjectFormLabel>
                  </ProjectFormControlHeader>
                  <ProjectImagesDropzoneWrapper>
                    <DropzoneArea
                      onChange={images => updateProject(images, 'images')}
                    />
                  </ProjectImagesDropzoneWrapper>
                </ProjectFormControl>
              </Grid>
              <Grid item xs={12}>
                <ProjectFormControl fullWidth component="fieldset">
                  <ProjectFormControlHeader>
                    <ProjectFormLabel>Project Links</ProjectFormLabel>
                    <ProjectFormHelperText>
                      GitHub, Figma, Notion, Airtable, Google Docs, etc.
                    </ProjectFormHelperText>
                  </ProjectFormControlHeader>
                  {links.map((link, index) => (
                    <FormText
                      key={index}
                      variant="outlined"
                      value={link}
                      placeHolder="Paste URL"
                      onChange={ev => updateLink(ev.target.value, index)}
                    />
                  ))}
                  <AddProjectLink onClick={addLink} className="text-left">
                    + Add another link
                  </AddProjectLink>
                </ProjectFormControl>
              </Grid>
            </Grid>
            <FooterWrapper>
              <GrayButton variant="contained" onClick={toggleModal}>
                Back
              </GrayButton>
              <BlueButton
                variant="contained"
                color="primary"
                onClick={closeModal}
              >
                Submit Project
              </BlueButton>
            </FooterWrapper>
          </BodyWrapper>
        </Fade>
      </OverlayModal>
    </>
  );
}

SecondStep.propTypes = {
  open: PropTypes.bool,
  toggleModal: PropTypes.func,
  video: PropTypes.string,
  images: PropTypes.array,
  links: PropTypes.array,
  closeModal: PropTypes.func,
  updateProject: PropTypes.func,
  addLink: PropTypes.func,
};

export default SecondStep;
