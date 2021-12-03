/**
 *
 * AdminEditCandidate
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { Body11, H1, H2, H3 } from 'components/shared/typogrophy';
import { candidateRoute } from 'helpers/electionsHelper';
import { BlueButton } from 'components/shared/buttons';
import CandidateAvatar from 'components/shared/CandidateAvatar';

import JoditEditorWrapper from './JoditEditor';
import ImageCrop from '../../shared/ImageCrop';
import Body from '../../shared/typogrophy/Body';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const StyledH1 = styled(H1)`
  margin: 1.5rem auto;
  text-align: center;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SaveButtonWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto 2rem;
`;

const EditFieldWrapper = styled(Body11)`
  margin: 1.5rem 0;
`;

const Input = styled(TextField)`
  && {
    .MuiInputBase-input {
      ont-size: 11px;
      line-height: 15px;
      letter-spacing: 0.5px;
      @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.md}) {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
`;

const DeleteUpdate = styled.div`
  margin-top: 10px;
  color: red;
  text-align: right;
  cursor: pointer;
`;

function AdminEditCandidate({
  candidate,
  chamber,
  saveCandidateCallback,
  uploadImageCallback,
  deleteUpdateCallback,
  loading,
}) {
  const [editableValues, setEditableValues] = useState(false);
  const [initialData, setInitialData] = useState(false);
  const [campaignWebsite, setCampaignWebsite] = useState('');
  const [info, setInfo] = useState('');
  const [campaignEdited, setCampaignEdited] = useState(false);
  const [infoEdited, setInfoEdited] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState('');
  const [editedInfo, setEditedInfo] = useState('');

  const [campaignSummary, setCampaignSummary] = useState('');
  const [summaryEdited, setSummaryEdited] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');

  const [updates, setUpdates] = useState([]);
  const [updatesEdited, setUpdatesEdited] = useState([]);
  const [editedUpdates, setEditedUpdates] = useState([]);

  const [newUpdates, setNewUpdates] = useState([]);

  const {
    openSecretsId,
    name,
    blocName,
    facebook,
    twitter,
    website,
    order,
    source,
    votesReceived,
    likelyVoters,
    initialShares,
  } = candidate;

  useEffect(() => {
    if (candidate) {
      const initData = {
        openSecretsId,
        blocName,
        source,
        facebook,
        twitter,
        website,
        order,
        votesReceived,
        likelyVoters,
        initialShares,
      };
      setInitialData(initData);
      setEditableValues(initData);
      if (candidate.campaignWebsite) {
        if (candidate.campaignWebsite.charAt(0) === '%') {
          setCampaignWebsite(decodeURIComponent(candidate.campaignWebsite));
        } else {
          setCampaignWebsite(candidate.campaignWebsite);
        }
      }
      if (candidate.info) {
        if (candidate.info.charAt(0) === '%') {
          setInfo(decodeURIComponent(candidate.info));
        } else {
          setInfo(candidate.info);
        }
      }
      if (candidate.campaignSummary) {
        if (candidate.campaignSummary.charAt(0) === '%') {
          setCampaignSummary(decodeURIComponent(candidate.campaignSummary));
        } else {
          setCampaignSummary(candidate.campaignSummary);
        }
      }
      setUpdates(candidate.campaignUpdates);
    }
  }, [candidate]);

  let candData = [];
  if (candidate) {
    candData = [
      {
        name: 'Open Secrets ID',
        value: openSecretsId,
        key: 'openSecretsId',
      },
      {
        name: 'Bloc Name',
        value: blocName,
        key: 'blocName',
      },
      {
        name: 'source (Ballotpedia)',
        value: source,
        key: 'source',
      },
      {
        name: 'Facebook',
        value: facebook,
        key: 'facebook',
      },
      {
        name: 'Twitter',
        value: twitter,
        key: 'twitter',
      },
      {
        name: 'Website',
        value: website,
        key: 'website',
      },
      {
        name: 'Votes Received',
        value: votesReceived,
        key: 'votesReceived',
      },
      {
        name: 'Likely Voters',
        value: likelyVoters,
        key: 'likelyVoters',
      },
      {
        name: 'Initial Shares',
        value: initialShares,
        key: 'initialShares',
      },
      { name: 'Order', value: order, key: 'order' },
    ];
  }

  const onChangeField = (event, key) => {
    setEditableValues({
      ...editableValues,
      [key]: event.target.value,
    });
  };

  const showSave =
    infoEdited ||
    campaignEdited ||
    summaryEdited ||
    updatesEdited.length > 0 ||
    newUpdates.length > 0 ||
    JSON.stringify(initialData) !== JSON.stringify(editableValues);

  const editInfo = value => {
    setEditedInfo(value);
    setInfoEdited(true);
  };

  const editCampaignWebsite = value => {
    setEditedCampaign(value);
    setCampaignEdited(true);
  };

  const editCampaignSummary = value => {
    setEditedSummary(value);
    setSummaryEdited(true);
  };

  const editUpdate = (value, index, updateId) => {
    const newUpdatesEdit = [...editedUpdates];
    newUpdatesEdit[index] = { id: updateId, text: value };
    setEditedUpdates(newUpdatesEdit);

    const newUpdatesEdited = [...updatesEdited];
    newUpdatesEdited.push(index);
    setUpdatesEdited(newUpdatesEdited);
  };

  const editNewUpdate = (value, index) => {
    newUpdates[index] = value;
  };

  const addNewUpdate = () => {
    const tempUpdates = [...newUpdates];
    tempUpdates.push('');
    setNewUpdates(tempUpdates);
  };

  const saveCandidate = () => {
    const data = {};
    const returnUpdates = {};
    if (infoEdited) {
      data.info = editedInfo.toString('html');
      if (data.info === '<p><br></p>') {
        data.info = '';
      }
    }
    if (campaignEdited) {
      data.campaignWebsite = editedCampaign.toString('html');
      if (data.campaignWebsite === '<p><br></p>') {
        data.campaignWebsite = '';
      }
    }
    if (summaryEdited) {
      data.campaignSummary = editedSummary.toString('html');
      if (data.campaignSummary === '<p><br></p>') {
        data.campaignSummary = '';
      }
    }
    if (updatesEdited.length > 0) {
      updatesEdited.forEach(updateIndex => {
        const { text } = editedUpdates[updateIndex];
        editedUpdates[updateIndex].text = text.toString('html');
        if (editedUpdates[updateIndex].text === '<p><br></p>') {
          editedUpdates[updateIndex].text = '';
        }
      });
      returnUpdates.existing = editedUpdates;
    }
    if (newUpdates.length > 0) {
      const htmlUpdates = [];
      newUpdates.forEach((update, index) => {
        htmlUpdates.push(update.toString('html'));
        if (htmlUpdates[index] === '<p><br></p>') {
          htmlUpdates[index] = '';
        }
      });
      returnUpdates.newUpdates = htmlUpdates;
    }

    addIfEdited('openSecretsId', data);
    addIfEdited('blocName', data);
    addIfEdited('source', data);
    addIfEdited('facebook', data);
    addIfEdited('twitter', data);
    addIfEdited('website', data);
    addIfEdited('votesReceived', data);
    addIfEdited('likelyVoters', data);
    addIfEdited('initialShares', data);
    addIfEdited('order', data);

    saveCandidateCallback(data, candidate, returnUpdates);
    setNewUpdates([]);
  };

  const addIfEdited = (key, data) => {
    if (initialData[key] !== editableValues[key]) {
      data[key] = editableValues[key];
    }
  };

  const handleUpload = base64 => {
    uploadImageCallback(base64, candidate, chamber);
  };
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      {/* <MobileHeader /> */}
      {candidate ? (
        <Wrapper>
          <StyledH1>Edit Candidate</StyledH1>
          {loading ? (
            <AvatarWrapper>
              <CircularProgress />
            </AvatarWrapper>
          ) : (
            <>
              <AvatarWrapper>
                <CandidateAvatar
                  src={candidate.image}
                  good={candidate.isGood}
                  name={candidate.name}
                  size="xl"
                />
              </AvatarWrapper>
              <ImageCrop
                uploadImageCallback={handleUpload}
                loading={loading}
                currentImage={candidate.image}
              />
            </>
          )}
          <H2 className="text-center">
            <a href={candidateRoute(candidate)} target="_blank">
              {name}
            </a>
          </H2>
          <br />
          <br />
          {showSave && (
            <SaveButtonWrapper onClick={saveCandidate}>
              <BlueButton fullWidth>SAVE</BlueButton>
            </SaveButtonWrapper>
          )}

          {candData.map(data => (
            <React.Fragment key={data.name}>
              <EditFieldWrapper>
                <Input
                  value={
                    editableValues[data.key] ? editableValues[data.key] : ''
                  }
                  label={data.name}
                  fullWidth
                  variant="outlined"
                  onChange={e => onChangeField(e, data.key)}
                />
              </EditFieldWrapper>
            </React.Fragment>
          ))}
          <br />
          <br />

          <H3>Other Candidate Info:</H3>
          <br />
          <JoditEditorWrapper initialText={info} onChangeCallback={editInfo} />
          <br />
          <br />

          <H3>Candidate Policy Positions:</H3>
          <br />
          <JoditEditorWrapper
            initialText={campaignWebsite}
            onChangeCallback={editCampaignWebsite}
          />
          <br />
          <br />
          <hr />
          <H2>Campaign Status</H2>
          <br />
          <br />

          <H3>Campaign Summary:</H3>
          <br />
          <JoditEditorWrapper
            initialText={campaignSummary}
            onChangeCallback={editCampaignSummary}
          />

          <br />
          <br />

          <H3>Updates:</H3>
          <hr />
          <br />

          {updates &&
            updates.map((update, index) => (
              <>
                <br />
                <br />
                <DeleteUpdate
                  onClick={() => {
                    deleteUpdateCallback(
                      candidate.id,
                      chamber,
                      !!candidate.isIncumbent,
                      update.id,
                    );
                  }}
                >
                  Delete This Update
                </DeleteUpdate>
                <JoditEditorWrapper
                  key={update.id}
                  initialText={update.text}
                  onChangeCallback={value => {
                    editUpdate(value, index, update.id);
                  }}
                />
              </>
            ))}

          {newUpdates.map((update, index) => (
            <React.Fragment key={`new-update-${index}`}>
              <br />
              <br />
              <Body>New Update #{index + 1}</Body>
              <JoditEditorWrapper
                initialText=""
                onChangeCallback={value => {
                  editNewUpdate(value, index);
                }}
              />
              <br />
            </React.Fragment>
          ))}
          <br />
          <div className="text-center">
            <BlueButton onClick={addNewUpdate}>Add New Update</BlueButton>
          </div>
          <br />
        </Wrapper>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

AdminEditCandidate.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  uploadImageCallback: PropTypes.func,
  loading: PropTypes.bool,
  chamber: PropTypes.string,
  saveCandidateCallback: PropTypes.func,
  deleteUpdateCallback: PropTypes.func,
};

export default AdminEditCandidate;
