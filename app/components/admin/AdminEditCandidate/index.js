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

import RtfEditor from './RtfEditor';
import ImageCrop from '../../shared/ImageCrop';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding-top: 36px;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
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
          theme.breakpoints.md}) {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
`;

function AdminEditCandidate({
  candidate,
  chamber,
  saveCandidateCallback,
  uploadImageCallback,
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

  const {
    openSecretsId,
    name,
    blocName,
    facebook,
    twitter,
    website,
    order,
    source,
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
    JSON.stringify(initialData) !== JSON.stringify(editableValues);

  const editInfo = value => {
    setEditedInfo(value);
    setInfoEdited(true);
  };

  const editCampaignWebsite = value => {
    setEditedCampaign(value);
    setCampaignEdited(true);
  };

  const saveCandidate = () => {
    const data = {};
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

    addIfEdited('openSecretsId', data);
    addIfEdited('blocName', data);
    addIfEdited('source', data);
    addIfEdited('facebook', data);
    addIfEdited('twitter', data);
    addIfEdited('website', data);
    addIfEdited('likelyVoters', data);
    addIfEdited('initialShares', data);
    addIfEdited('order', data);

    saveCandidateCallback(data, candidate);
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
      <MobileHeader />
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

          <H3>Candidate Policy Position:</H3>
          <br />
          <RtfEditor initialText={info} onChangeCallback={editInfo} />
          <br />
          <br />

          <H3>Campaign Website &amp; Other Info:</H3>
          <br />
          <RtfEditor
            initialText={campaignWebsite}
            onChangeCallback={editCampaignWebsite}
          />
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
};

export default AdminEditCandidate;
