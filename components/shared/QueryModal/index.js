/**
 *
 * QueryModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      position: relative;
      width: 100vw;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.purple3};
      padding: 24px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
          2px -2px 5px rgba(224, 212, 234, 0.2),
          -2px -2px 5px rgba(255, 255, 255, 0.9),
          2px 2px 5px rgba(224, 212, 234, 0.9),
          inset 1px 1px 1px rgba(255, 255, 255, 0.3),
          inset -1px -1px 1px rgba(224, 212, 234, 0.5);
      }
    }

    .MuiBackdrop-root {
      background: rgba(240, 236, 243, 0.9);
      backdrop-filter: blur(5px);
    }

    &.purple {
      .MuiDialog-paper {
        background: linear-gradient(
            0deg,
            rgba(110, 38, 219, 0.8),
            rgba(110, 38, 219, 0.8)
          ),
          #ffffff;
      }
    }
    &.no-blur {
      .MuiBackdrop-root {
        background: rgba(240, 236, 243, 0);
      }
    }
  }
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
  &.purple {
    color: #fff;
  }
`;

function QueryModal({
  closeModalCallback,
  children,
  modalStyles = {},
  mode,
  zIndex,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  console.log('{ ...modalStyles.dialog }, { zIndex }', {
    ...modalStyles.dialog,
    zIndex,
  });
  return (
    <TgpDialog
      onClose={closeModalCallback}
      open
      fullScreen={fullScreen}
      className={`${mode} ${zIndex === 1400 ? 'no-blur' : ''}`}
      style={{ ...modalStyles.dialog, zIndex }}
    >
      <TopWrapper>
        <TopClose
          onClick={closeModalCallback}
          style={modalStyles.closeButton}
          className={mode}
        />
      </TopWrapper>
      {children}
    </TgpDialog>
  );
}

QueryModal.propTypes = {
  closeModalCallback: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalStyles: PropTypes.object,
  mode: PropTypes.string,
  zIndex: PropTypes.number,
};

export default QueryModal;
