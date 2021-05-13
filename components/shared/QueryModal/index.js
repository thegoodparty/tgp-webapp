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
      background-color: ${({ theme }) => theme.colors.purple3};
      padding: 24px;
      border-radius: 8px;
      box-shadow: none;
    }

    .MuiBackdrop-root {
      background: rgb(240, 236, 243);
    }

    &.close-dialog {
      .MuiDialog-paper {
        background-color: ${({ theme }) => theme.colors.grayBg} !important;
      }
      max-width: 100% !important;
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
  const fullScreen = useMediaQuery(
    `(max-width: ${theme.breakpointsPixels.md}px)`,
  );
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (close && !closeTitle) {
      closeModalCallback();
    }
  }, [close]);
  return (
    <TgpDialog
      onClose={() => setClose(true)}
      open
      fullScreen={fullScreen}
      className={`${close && 'close-dialog'} ${mode} `}
      style={modalStyles.dialog}
    >
      {!closeTitle && !hideClose && (
        <TopWrapper>
          <TopClose
            onClick={() => setClose(true)}
            style={modalStyles.closeButton}
            className={!(closeTitle && close) && mode}
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
