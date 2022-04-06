/**
 *
 * EndorseButtonModal
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { MdContentCopy } from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import apiHelper from '/helpers/apiHelper';
import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import Modal from '../../shared/Modal';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import PinkButton from '../../shared/buttons/PinkButton';
import { FontH3 } from '../../shared/typogrophy';
import ColorPicker from './ColorPicker';

const Inner = styled.div`
  max-width: 820px;
  width: 90vw;
  background-color: #fff;
  padding: 48px;
  border-radius: 16px;
  max-height: 90vh;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Cancel = styled.span`
  cursor: pointer;
  display: inline-block;
  margin-right: 32px;
`;

const ButtonArea = styled.div`
  background-color: #f3f3f3;
  padding: 20px;
  margin-top: 12px;
  border-radius: 6px;
`;

const Inverted = styled.div`
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;
const ButtonWrapper = styled.div`
  margin: 50px 0 30px;
  text-align: center;
`;
const ResultButton = styled.div`
  display: inline-block;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: 700;
`;

const InnerResultButton = styled.div`
  padding: 16px 72px;
`;

const Copy = styled.div`
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`;

const Copied = styled.div`
  margin-top: 8px;
  color: red;
`;

const Switch = styled.div`
  display: flex;
  font-size: 11px;
  justify-content: center;
`;

const InnerSwitch = styled.div`
  background-color: #e4e4e4;
  border-radius: 4px;
  display: flex;
`;

const SwitchButton = styled.div`
  width: 100px;
  color: #7a7a7a;
  background-color: #e4e4e4;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &.active {
    background-color: #000;
    color: #fff;
  }
`;

const PickerWrapper = styled.div`
  text-align: center;
  padding-top: 10px;
`;

const CustomWrapper = styled.div`
  cursor: pointer;
  height: 100%;
`;

const labels = [
  'ENDORSE ME',
  'ADD YOUR NAME',
  'LEARN MORE',
  'SHARE THIS CAMPAIGN',
  'FOLLOW',
];
const initialState = {
  label: labels[0],
  backgroundColor: '#5c00c7',
  textColor: '#FFF',
  isOpen: false,
  colorEdit: 'button',
  copied: false,
};

function EndorseButtonModal({ customElement }) {
  const { candidate, savePreferencesCallback } = useContext(
    CandidatePortalHomePageContext,
  );
  const { id, preferences } = candidate;
  const [state, setState] = useState(initialState);
  const { apiBase, base } = apiHelper;

  useEffect(() => {
    if (preferences) {
      setState({
        ...state,
        backgroundColor: preferences.backgroundColor,
        textColor: preferences.textColor,
        label: preferences.label,
      });
    }
  }, [preferences]);

  const onChangeField = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const invertButton = () => {
    setState({
      ...state,
      backgroundColor: state.textColor,
      textColor: state.backgroundColor,
    });
  };

  const closeModal = () => {
    // undo changes
    if (preferences) {
      setState({
        ...state,
        isOpen: false,
        backgroundColor: preferences.backgroundColor,
        textColor: preferences.textColor,
        label: preferences.label,
      });
    }
  };

  const save = () => {
    savePreferencesCallback(candidate.id, {
      ...preferences,
      backgroundColor: state.backgroundColor,
      textColor: state.textColor,
      label: state.label,
    });
    onChangeField('isOpen', false);
  };

  const handleColorChange = (color) => {
    if (state.colorEdit === 'button') {
      onChangeField('backgroundColor', color);
    } else {
      onChangeField('textColor', color);
    }
  };

  const buttonCode = () => {
    return `<a href=${base}/embed/redirect/${id} 
    style="
      font-size: 16px; 
      color: ${state.textColor}; 
      padding: 16px 72px;
      text-align: center; 
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      font-weight: 700;
      text-transform: uppercase; 
      background-color: ${state.backgroundColor}; ;
    ">
    <img src="${apiBase}button/impression?id=${id}" />
    ${state.label}
  </a>`;
  };

  return (
    <>
      {customElement ? (
        <CustomWrapper onClick={() => onChangeField('isOpen', true)}>
          {customElement}
        </CustomWrapper>
      ) : (
        <PinkButton onClick={() => onChangeField('isOpen', true)}>
          <InnerButton>Activate Endorse Button</InnerButton>
        </PinkButton>
      )}
      <Modal
        open={state.isOpen}
        closeModalCallback={closeModal}
        showCloseButton={false}
      >
        <Inner>
          <Row>
            <FontH3 style={{ margin: 0 }}>Edit Button</FontH3>
            <div className="text-right">
              <Cancel onClick={closeModal}>Cancel</Cancel>
              <CopyToClipboard
                text={buttonCode()}
                onCopy={() => onChangeField('copied', true)}
              >
                <BlackButton onClick={save}>
                  <InnerButton>Save &amp; Copy Code</InnerButton>
                </BlackButton>
              </CopyToClipboard>
            </div>
          </Row>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Select
                native
                value={state.label}
                onChange={(e) => onChangeField('label', e.target.value)}
                fullWidth
                variant="outlined"
              >
                {labels.map((label) => (
                  <option value={label} key={label}>
                    {label}
                  </option>
                ))}
              </Select>
              <ButtonArea>
                <Inverted onClick={invertButton}>Show Inverted Button</Inverted>
                <ButtonWrapper>
                  <ResultButton
                    style={{
                      backgroundColor: state.backgroundColor,
                      color: state.textColor,
                    }}
                  >
                    <InnerResultButton>{state.label}</InnerResultButton>
                  </ResultButton>
                </ButtonWrapper>
                <CopyToClipboard
                  text={buttonCode()}
                  onCopy={() => onChangeField('copied', true)}
                >
                  <Copy>
                    <MdContentCopy /> &nbsp; Copy Embed Code
                    {state.copied && <Copied>Copied!</Copied>}
                  </Copy>
                </CopyToClipboard>
              </ButtonArea>
            </Grid>
            <Grid item xs={12} md={5}>
              <Switch>
                <InnerSwitch>
                  <SwitchButton
                    className={state.colorEdit === 'button' && 'active'}
                    onClick={() => onChangeField('colorEdit', 'button')}
                  >
                    Button
                  </SwitchButton>
                  <SwitchButton
                    className={state.colorEdit === 'text' && 'active'}
                    onClick={() => onChangeField('colorEdit', 'text')}
                  >
                    Text
                  </SwitchButton>
                </InnerSwitch>
              </Switch>
              <PickerWrapper>
                <ColorPicker
                  onColorPick={handleColorChange}
                  initialColor={
                    state.colorEdit === 'button'
                      ? state.backgroundColor
                      : state.textColor
                  }
                />
              </PickerWrapper>
            </Grid>
          </Grid>
        </Inner>
      </Modal>
    </>
  );
}

export default EndorseButtonModal;
