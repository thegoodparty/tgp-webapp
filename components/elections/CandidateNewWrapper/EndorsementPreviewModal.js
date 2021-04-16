/**
 *
 * EndorsmentPreviewModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import QueryModalContainer from 'containers/shared/QueryModalContainer';
import { Body11 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import ShareImage from '../ShareImageWrapper';

const ImageWrapper = styled.div`
  border-radius: 12px;
  margin-top: 24px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
    2px -2px 5px rgba(224, 212, 234, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(224, 212, 234, 0.9),
    inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);
`;

const Personal = styled(Body11)`
  margin: 24px 0 8px;
  color: ${props => props.theme.colors.gray6};
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 20px;
    .MuiInputBase-multiline {
      background-color: #fff;
      box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.colors.purple};
    }
  }
`;

function EndorsementPreviewModal({
  candidate,
  user,
  candidateSupports,
  previewNextStepCallback,
  fromShareLink,
}) {
  let defaultMessage = `Check out the crowd-voting campaign for ${
    candidate.firstName
  } ${candidate.lastName} for ${candidate.race}`;

  if (!fromShareLink) {
    defaultMessage = `Someone real, not another 💩 politician!`;

    if (user) {
      defaultMessage += `${'\n'} ${'\n'}I'm ${
        user?.name
      } and I approve this message! 😜`;
    }
  }

  const [message, setMessage] = useState(defaultMessage);

  const onChangeField = e => {
    setMessage(e.target.value);
  };

  const modalStyles = {
    dialog: {
      maxWidth: '452px',
      margin: '0 auto',
    },
  };
  return (
    <QueryModalContainer
      modalStyles={modalStyles}
      closeTitle={"Are you sure you don't want to share?"}
      closeContent="Sharing a personal endorsement is the most powerful way to grow a grassroots campaign."
      closeBack="BACK TO SHARE"
    >
      <Body11 style={{ marginTop: '12px' }}>
        PREVIEW {fromShareLink ? 'SHARE' : 'ENDORSEMENT'}
      </Body11>
      <ImageWrapper>
        <ShareImage
          candidate={candidate}
          withRender={false}
          candidateSupports={candidateSupports}
          fromShareLink={fromShareLink}
        />
      </ImageWrapper>
      <Personal>ADD A PERSONAL NOTE</Personal>
      <StyledTextField
        multiline
        rows={4}
        value={message}
        variant="outlined"
        onChange={onChangeField}
      />

      <PurpleButton
        onClick={() => previewNextStepCallback(candidate.id, message)}
      >
        CONTINUE
      </PurpleButton>
    </QueryModalContainer>
  );
}

EndorsementPreviewModal.propTypes = {
  candidate: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  previewNextStepCallback: PropTypes.func,
  candidateSupports: PropTypes.number,
  fromShareLink: PropTypes.bool,
};

export default EndorsementPreviewModal;
