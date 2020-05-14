/**
 *
 * Join
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Fade, TextField } from '@material-ui/core';
import Collaborators from '../../Collaborators';
import { Body, Body18, Body13 } from '../../typography';
import { MediumButton } from '../../buttons';

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
  margin-bottom: 1rem;
  text-align: left;
`;

const Blurb = styled(Body18)`
  margin: 1rem 0 3rem;
`;
const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
`;

const SocialIcon = styled.img`
  margin-right: 0.7rem;
`;

const SendButton = styled(MediumButton)`
  && {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

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
function TouchProject({ open, handleClose, project }) {
  return (
    <OverlayModal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <Wrapper>
          <Title>{project.title}</Title>
          <CollaboratorsWrapper>
            <Collaborators project={project} />
          </CollaboratorsWrapper>
          <Message
            multiline
            rows={10}
            variant="outlined"
            placeholder="Let them know how you can help with this project…"
          />
          <FooterWrapper>
            <SendButton>Send</SendButton>
            <FooterMessage>
              Your message will be emailed to Kai Gradert
            </FooterMessage>
          </FooterWrapper>
        </Wrapper>
      </Fade>
    </OverlayModal>
  );
}

TouchProject.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  project: PropTypes.object,
};

export default TouchProject;
