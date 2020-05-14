/**
 *
 * Join
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Modal,
  Fade,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Grid,
} from '@material-ui/core';
import Collaborators from '../../Collaborators';
import { Body, Body18, Body15, Body13 } from '../../typography';
import { MediumButton } from '../../buttons';
import { MultipleSelect } from 'react-select-material-ui';
import { DropzoneArea } from 'material-ui-dropzone';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Wrapper = styled.div`
  max-width: 40rem;
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: none;
  text-align: center;
`;
const OverlayModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 97px;
  width:  120px
  margin-bottom: 1.5rem;
`;

const Title = styled(Body)`
  color: #000;
  line-height: 130%;
  text-transform: none;
  margin-top: 0;
  margin-bottom: 2.5rem;
  text-align: left;
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
`;

const SocialIcon = styled.img`
  margin-right: 0.7rem;
`;

const BlueButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;
const GrayButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.creators.colors.lightGray};
    margin-right: 1rem;
  }
`;

const FooterMessage = styled(Body13)`
  color: ${({ theme }) => theme.creators.colors.gray};
  margin-left: 1.5rem;
`;

const CollaboratorsWrapper = styled.div`
  display: flex;
`;

const FormText = styled(TextField)`
  && {
    width: 100%;
    background: ${({ theme }) => theme.creators.colors.formColor};
    border-radius: 4px;
    margin-top: 0.8rem;
    .MuiInputBase-input {
      padding: 14px;
    }
    .MuiOutlinedInput-multiline {
      padding: 0;
    }
  }
`;

const ProjectFormLabel = styled(Body18)`
  color: black;
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const ProjectFormControl = styled(FormControl)`
  && {
    margin-bottom: 2.5rem;
  }
`;

const ProjectFormHelperText = styled(FormHelperText)`
  && {
    font: normal normal 15px/20px normal;
    color: ${({ theme }) => theme.creators.colors.gray};
  }
`;

const ProjectFormControlHeader = styled.div`
  display: flex;
`;

const TopicSelect = styled(MultipleSelect)`
  && {
    & > div > div {
      border: none;
      background: none;
    }
    & > div > div:hover {
      border: none;
      background: none;
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
function ListProject({ open, handleClose }) {
  const [state, setState] = useState({
    title: null,
    summary: null,
    topics: [],
    video: null,
    images: null,
    links: [''],
    collaborator: false,
  });
  const [firstModal, toggleFirstModal] = useState(true);
  const [secondModal, toggleSecondModal] = useState(false);
  const updateProject = (value, key) => {
    console.log('images', value);
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };
  const updateLink = (value, index) => {
    let { links } = state;
    links[index] = value;
    if (value === '' && links.length !== 1) links.splice(index, 1);
    setState(prevState => ({
      ...prevState,
      links,
    }));
  };
  const closeModal = () => {
    toggleFirstModal(false);
    toggleSecondModal(false);
    handleClose();
  };
  const addLink = value => {
    let { links } = state;
    if (links[links.length - 1] === '') return;
    links.push('');
    setState(prevState => ({
      ...prevState,
      links,
    }));
  };
  useEffect(() => {
    if (open == true) {
      toggleFirstModal(true);
      toggleSecondModal(false);
    }
  }, [open]);

  const toggleModal = () => {
    toggleFirstModal(!firstModal);
    toggleSecondModal(!secondModal);
  };

  const { title, summary, topics, video, images, links, collaborator } = state;
  return (
    <>
      {firstModal && (
        <OverlayModal
          key="first-modal"
          open={open && firstModal}
          onClose={closeModal}
          aria-labelledby="first-modal"
          aria-describedby="first-modal-description"
        >
          <Fade in={open}>
            <Wrapper>
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
                      rows={7}
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
                  <FormControlLabel
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
                <GrayButton variant="contained" onClick={closeModal}>Cancel</GrayButton>
                <BlueButton variant="contained" color="primary" onClick={toggleModal}>
                  Next:Add links & Media
                </BlueButton>
              </FooterWrapper>
            </Wrapper>
          </Fade>
        </OverlayModal>
      )}
      {secondModal && (
        <OverlayModal
          open={secondModal}
          onClose={closeModal}
          key="second-modal"
          aria-labelledby="second-modal-title"
          aria-describedby="second-modal-description"
        >
          <Fade in={open}>
            <Wrapper>
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
                        variant="outlined"
                        value={link}
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
                <GrayButton variant="contained" onClick={toggleModal}>Back</GrayButton>
                <BlueButton variant="contained" color="primary" onClick={closeModal}>Submit Project</BlueButton>
              </FooterWrapper>
            </Wrapper>
          </Fade>
        </OverlayModal>
      )}
    </>
  );
}

ListProject.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ListProject;
