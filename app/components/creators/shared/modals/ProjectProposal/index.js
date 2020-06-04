/**
 *
 * ProjectProposal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fade, TextField } from '@material-ui/core';
import Collaborators from '../../Collaborators';
import { Body18, Body13 } from '../../typography';
import { BlueButton } from '../../buttons';
import { Title, BodyWrapper, OverlayModal, FooterWrapper, CloseIcon } from '../shared';

const FooterMessage = styled(Body13)`
  color: ${({ theme }) => theme.creators.colors.gray};
  margin-left: 1.5rem;
`;

const CollaboratorsWrapper = styled.div`
  display: flex;
`;

const Message = styled(TextField)`
  && {
    width: 100%;
    margin-top: 2.5rem;
    background: ${({ theme }) => theme.creators.colors.formColor};
    border-radius: 4px;
  }
`;

const SubmitWrapper = styled(FooterWrapper)`
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    display: block;
  }
`;

const SendButton = styled(BlueButton)`
  && {
    margin-bottom: 0.7rem;
  }
`;
function ProjectProposal({ open, handleClose, project }) {
  return (
    <OverlayModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <BodyWrapper>
          <CloseIcon onClick={handleClose} />
          <Title>{project.title}</Title>
          <CollaboratorsWrapper>
            <Collaborators project={project} />
          </CollaboratorsWrapper>
          <Message
            multiline
            rows={10}
            variant="outlined"
            placeholder="Let them know how you can help with this project…"
            autoFocus
          />
          <SubmitWrapper>
            <SendButton color="primary" variant="contained">
              Send
            </SendButton>
            <FooterMessage>
              Your message will be emailed to Kai Gradert
            </FooterMessage>
          </SubmitWrapper>
        </BodyWrapper>
      </Fade>
    </OverlayModal>
  );
}

ProjectProposal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  project: PropTypes.object,
};

export default ProjectProposal;
