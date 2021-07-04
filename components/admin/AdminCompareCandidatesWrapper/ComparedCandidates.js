/**
 *
 * ComparedCandidates
 *
 */

import React, { useState, useEffect, memo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { getValidImgUrl } from 'helpers/linkHelper';
import { BlueButton } from 'components/shared/buttons';

import ImageCrop from '../../shared/ImageCrop';

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Delete = styled.div`
  padding: 0.8rem 0;
  cursor: pointer;
  &:hover {
    color: red;
  }

  &.disabled {
    color: #fff;
    cursor: default;
    &:hover {
      color: #fff;
    }
  }
`;

const CropWrapper = styled.div`
  position: relative;
  input[type='file'] {
    width: 100%;
  }
`;

const initialCriteria = ['image', 'name', 'party', 'website'];

function ComparedCandidates({ candidate, candidatesCallback, topics }) {
  const [candidates, setCandidates] = useState([
    {
      image: candidate ? candidate.image : '',
      name: candidate ? `${candidate.firstName} ${candidate.lastName}` : '',
      party: candidate ? candidate.party : '',
    },
  ]);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [updateParent, setUpdateParent] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({});

  useEffect(() => {
    if (
      candidate?.comparedCandidates?.candidates &&
      candidate.comparedCandidates.candidates.length > 0
    ) {
      const existingCriteria = Object.keys(
        candidate.comparedCandidates.candidates[0],
      );
      const newCriteria = [...initialCriteria];
      // insert website
      existingCriteria.forEach(crit => {
        if (!initialCriteria.includes(crit)) {
          newCriteria.push(crit);
        }
      });
      setCriteria(newCriteria);
      const compared = candidate.comparedCandidates.candidates;
      compared[0].name = `${candidate.firstName} ${candidate.lastName}`;
      compared[0].party = candidate.party;
      compared[0].image = candidate.image;
      setCandidates(compared);
    }
  }, [candidate]);

  useEffect(() => {
    if (updateParent) {
      candidatesCallback({ candidates, uploadedImages });
      setUpdateParent(false);
    }
  }, [updateParent]);

  const addCandidate = () => {
    const newCandidates = [...candidates];
    newCandidates.push({
      name: '',
    });
    setCandidates(newCandidates);
  };

  const addCriteria = () => {
    const newCriteria = [...criteria];
    newCriteria.push('New Criteria');
    setCriteria(newCriteria);
  };

  const onChangeCand = (key, val, index) => {
    const newCandidates = [...candidates];
    newCandidates[index][key] = val;
    setCandidates(newCandidates);
    setUpdateParent(true);
  };

  const onChangeCriteria = (val, index) => {
    const newCriteria = [...criteria];
    newCriteria[index] = val;
    setCriteria(newCriteria);
    setUpdateParent(true);
  };

  const setSelectedCriteria = (val, index) => {
    const newCriteria = [...criteria];
    newCriteria[index] = val;
    setCriteria(newCriteria);
    setUpdateParent(true);
  };

  const deleteCriteria = index => {
    const newCriteria = [...criteria];
    const newCandidates = [...candidates];

    const [removed] = newCriteria.splice(index, 1);
    newCandidates.forEach(candidate => {
      delete candidate[removed];
    });
    setCriteria(newCriteria);
    setCandidates(newCandidates);
    setUpdateParent(true);
  };

  const deleteCandidate = index => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
    setUpdateParent(true);
  };

  const handleUploadImage = (index, base64) => {
    setUploadedImages({ ...uploadedImages, [index]: { index, base64 } });
    setUpdateParent(true);
  };

  const disabledRows = 3;

  return (
    <Wrapper>
      {criteria.map((crit, index) => (
        <Grid container spacing={3}>
          <Grid item xs style={{ flex: 0 }}>
            {index > disabledRows ? (
              <Delete>
                <DeleteForeverIcon onClick={() => deleteCriteria(index)} />
              </Delete>
            ) : (
              <Delete className="disabled">
                <DeleteForeverIcon />
              </Delete>
            )}
          </Grid>
          <Grid item xs>
            {index === 0 && (
              <Delete className="disabled">
                <DeleteForeverIcon />
              </Delete>
            )}
            {index < disabledRows + 1 ? (
              <TextField
                fullWidth
                variant="outlined"
                value={crit}
                onChange={e => onChangeCriteria(e.target.value, index)}
                onBlur={() => setUpdateParent(true)}
                disabled
              />
            ) : (
              <Select
                native
                value={crit}
                onChange={e => setSelectedCriteria(e.target.value, index)}
                fullWidth
                variant="outlined"
              >
                <option value="">Select Topic</option>
                {topics?.map(topic => (
                  <option
                    value={topic.name}
                    key={topic.id}
                    selected={crit === topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </Select>
            )}
          </Grid>
          {candidates.map((cand, index2) => (
            <Grid item xs>
              {index === 0 && index2 !== 0 && (
                <Delete className="text-center">
                  <DeleteForeverIcon
                    onClick={() => {
                      deleteCandidate(index2);
                    }}
                  />
                </Delete>
              )}
              {index === 0 && index2 === 0 && (
                <Delete className="disabled">
                  <DeleteForeverIcon />
                </Delete>
              )}
              {crit === 'image' ? (
                <div className="text-center">
                  {cand[crit] ? (
                    <Img src={getValidImgUrl(cand[crit])} />
                  ) : (
                    <>
                      {index2 > 0 && (
                        <CropWrapper>
                          <ImageCrop
                            currentImage={getValidImgUrl(cand[crit])}
                            uploadImageCallback={base64 => {
                              handleUploadImage(index2, base64);
                            }}
                            showTitle={false}
                          />
                        </CropWrapper>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <TextField
                  fullWidth
                  label={crit}
                  variant="outlined"
                  value={cand[crit]}
                  onChange={e => onChangeCand(crit, e.target.value, index2)}
                  onBlur={() => setUpdateParent(true)}
                  disabled={index2 === 0 && index < 3}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ))}
      <br />
      <br />
      <BlueButton onClick={addCandidate}>
        Add a Candidate to compare (Column)
      </BlueButton>{' '}
      <BlueButton onClick={addCriteria}>Add a Criteria (Row)</BlueButton>
    </Wrapper>
  );
}

ComparedCandidates.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  topics: PropTypes.array,
  candidatesCallback: PropTypes.func,
};

export default memo(ComparedCandidates);
