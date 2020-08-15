/**
 *
 * QueryModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      margin: 12px !important;
      width: 100vw;
      max-width: ${({ theme }) => theme.breakpoints.contentMax};
    }
  }
`;

const Wrapper = styled.div`
  padding: 12px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px;
  }
`;

const TopWrapper = styled.div`
  text-align: right;
  margin-bottom: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size 24px;
  cursor: pointer;

`;

function QueryModal({ closeModalCallback, children, modalStyles = {} }) {
  return (
    <TgpDialog onClose={closeModalCallback} open>
      <Wrapper style={modalStyles.wrapper}>
        <TopWrapper>
          <TopClose
            onClick={closeModalCallback}
            style={modalStyles.closeButton}
          />
        </TopWrapper>
        {children}
      </Wrapper>
    </TgpDialog>
  );
}

QueryModal.propTypes = {
  closeModalCallback: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalStyles: PropTypes.object,
};

export default QueryModal;
