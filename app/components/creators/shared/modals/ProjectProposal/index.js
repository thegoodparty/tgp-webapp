/**
 *
 * ProjectProposal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fade, TextField } from '@material-ui/core';
import Collaborators from '../../Collaborators';
import { Body18, Body13 } from '../../typography';
import { BlueButton } from '../../buttons';
import {
  Title,
  BodyWrapper,
  OverlayModal,
  FooterWrapper,
  CloseIcon,
} from '../shared';

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
    margin-top: 1rem;
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

function ProjectProposal({
  open,
  handleClose,
  project,
  user,
  sendMessageToCreatorCallback,
}) {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    const messageInfo = {
      message,
      projectName: project.title,
      creatorEmail: project.email,
      creatorName: project.creatorName,
    };
    sendMessageToCreatorCallback(messageInfo);
    handleClose();
  };
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
            value={message}
            onChange={ev => setMessage(ev.target.value)}
          />
          <SubmitWrapper>
            <BlueButton
              color="primary"
              variant="contained"
              disabled={message.length === 0}
              onClick={sendMessage}
            >
              Send
            </BlueButton>
            <FooterMessage>
              Your message will be emailed to {project.creatorName}
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
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  sendMessageToCreatorCallback: PropTypes.func,
};

export default ProjectProposal;
