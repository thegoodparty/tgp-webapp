/**
 *
 * QueryModal
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { Body11, Body13, H2 } from 'components/shared/typogrophy';
import { PurpleButton, OutlinedButton } from '../../shared/buttons';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      position: relative;
      width: 100vw;
      border-radius: 0;
      background-color: ${({ theme }) => theme.colors.purple3};
      padding: 24px;

      @media only screen and (min-width: 1280px) {
        box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
          2px -2px 5px rgba(224, 212, 234, 0.2),
          -2px -2px 5px rgba(255, 255, 255, 0.9),
          2px 2px 5px rgba(224, 212, 234, 0.9),
          inset 1px 1px 1px rgba(255, 255, 255, 0.3),
          inset -1px -1px 1px rgba(224, 212, 234, 0.5);
        border-radius: 8px;
      }
    }

    .MuiBackdrop-root {
      background: rgb(240, 236, 243);
    }

    &.close-dialog {
      .MuiDialog-paper {
        background-color: ${({ theme }) => theme.colors.grayBg} !important;
      }
    }
    &.purple {
      .MuiDialog-paper {
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0) 47.4%
          ),
          rgba(110, 38, 219, 0.8);
      }
    }
  }
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1000;
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
  hideClose = false,
  closeTitle,
  closeContent,
  closeBack,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (close && !closeTitle) {
      closeModalCallback();
    }
  }, [close]);
  return (
    <TgpDialog
      onClose={closeModalCallback}
      open
      fullScreen={fullScreen}
      className={`${close && 'close-dialog'} ${mode} `}
      style={modalStyles.dialog}
    >
      {!hideClose && (
        <TopWrapper>
          <TopClose
            onClick={() => setClose(true)}
            style={modalStyles.closeButton}
            className={mode}
          />
        </TopWrapper>
      )}
      {(!closeTitle || !close) && children}
      {closeTitle && close && (
        <>
          <H2 style={{ color: '#292936' }}>{closeTitle}</H2>
          <Body13 style={{ color: '#11111F', marginTop: 8 }}>
            {closeContent}
          </Body13>
          <Grid container spacing={2} style={{ marginTop: 18 }}>
            <Grid item xs={6}>
              <PurpleButton
                fullWidth
                className="outline"
                onClick={closeModalCallback}
              >
                YES, EXIT
              </PurpleButton>
            </Grid>
            <Grid item xs={6}>
              <PurpleButton fullWidth onClick={() => setClose(false)}>
                {closeBack}
              </PurpleButton>
            </Grid>
          </Grid>
        </>
      )}
    </TgpDialog>
  );
}

QueryModal.propTypes = {
  closeModalCallback: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalStyles: PropTypes.object,
  mode: PropTypes.string,
  hideClose: PropTypes.bool,
  closeTitle: PropTypes.string,
  closeContent: PropTypes.string,
  closeBack: PropTypes.string,
};

export default QueryModal;
