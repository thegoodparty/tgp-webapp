/**
 *
 * EndorsmentPreviewModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';

import QueryModalContainer from 'containers/shared/QueryModalContainer';
import { Body11, H2, H3 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

const ImageWrapper = styled.div`
  border-radius: 12px;
  margin-top: 24px;
  overflow: hidden;
  box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);
  filter: drop-shadow(-2px 2px 5px rgba(224, 212, 234, 0.2)),
    drop-shadow(2px -2px 5px rgba(224, 212, 234, 0.2)),
    drop-shadow(-2px -2px 5px rgba(255, 255, 255, 0.9)),
    drop-shadow(2px 2px 5px rgba(224, 212, 234, 0.9));
`;

const Img = styled.div`
  height: 168px;
  background-size: cover;
  background-position: center;
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

function EndorsementPreviewModal({ candidate, user, previewNextStepCallback }) {
  const [message, setMessage] = useState(
    `Someone real, not another 💩 politician!\nI'm ${user?.name} and I Approve this message! 😜`,
  );

  const onChangeField = e => {
    setMessage(e.target.value);
  };
  return (
    <QueryModalContainer>
      <H2 style={{ marginTop: '24px' }}>Preview endorsement</H2>
      <ImageWrapper>
        <Img style={{ backgroundImage: `url(${candidate.image})` }} />
        <H3 style={{ padding: '20px' }}>
          See why 12,491 people support a different kind of candidate
        </H3>
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
};

export default EndorsementPreviewModal;
