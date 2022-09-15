/**
 *
 * TopSection
 *
 */

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import dynamic from 'next/dynamic';

import { CandidatesContext } from '/containers/CandidatesPage';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import Modal from '../shared/Modal';
import LoadingAnimation from '../shared/LoadingAnimation';
import CheckVoteRegistration from './CheckVoteRegistration';

const VerifyVotePage = dynamic(
  () => import('/containers/voterize/VerifyVotePage'),
  {
    loading: () => (
      <div style={{ padding: '60px' }}>
        <LoadingAnimation fullPage={false} />
      </div>
    ),
  },
);

const Wrapper = styled.section``;

const H2 = styled.h2`
  font-size: 21px;
  font-weight: 900;
  margin: 30px 0 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin: 0 0 40px;
  }
`;
const Pill = styled.div`
  display: inline-block;
  padding: 8px 15px;
  background-color: #f3f3f3;
  margin: 15px 17px 0 0;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 7px;
  &:hover {
    background-color: #dddddd;
  }

  &.selected {
    background-color: #000;
    color: #fff;
  }
`;

const PositionsWrapper = styled.div`
  height: 110px;
  overflow: hidden;
  margin-bottom: 14px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-bottom: 24px;
  }
`;

const ButtonWrapper = styled.div`
  font-size: 14px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: right;
  }
`;

function FiltersSection() {
  const {
    positions,
    states,
    filterCandidatesCallback,
    routePosition,
    routeState,
  } = useContext(CandidatesContext);
  const [state, setState] = useState({
    position: '',
    state: routeState || '',
  });

  const [positionsById, setPositionsById] = useState({});
  const [showVoteModal, setShowVoteModal] = useState(false);

  useEffect(() => {
    const byId = {};
    positions.forEach((position) => {
      byId[position.id] = position;
    });
    setPositionsById(byId);
  }, [positions]);

  useEffect(() => {
    let position = '';
    let state = '';
    if (Object.keys(positionsById).length > 0) {
      if (routePosition && routePosition !== 'all') {
        position = parseInt(routePosition.split('|')[1], 10);
      }
    }
    if (routeState) {
      state = states.findIndex((item) => item === routeState);
    }

    setState({
      position,
      state,
    });
  }, [routePosition, routeState, positionsById]);

  const onChangeField = (key, val) => {
    const newState = {
      ...state,
      [key]: val,
    };
    setState(newState);
    filterCandidatesCallback(
      positionsById[newState.position],
      states[newState.state],
    );
  };

  const handlePillClick = (id) => {
    if (id === state.position) {
      onChangeField('position', '');
    } else {
      onChangeField('position', id);
    }
  };

  return (
    <Wrapper>
      {positions.length > 0 && (
        <>
          <H2 data-cy="filter-section-title">Filter by Top Issues</H2>

          <PositionsWrapper>
            {positions.map((position) => (
              <Pill
                key={position.id}
                onClick={() => {
                  handlePillClick(position.id);
                }}
                className={position.id === state.position && 'selected'}
                data-cy="position-pill"
              >
                {position.name} ({position.candidates?.length})
              </Pill>
            ))}
          </PositionsWrapper>
        </>
      )}
      <Grid container spacing={3}>
        <Grid item xs={8} lg={3}>
          <Autocomplete
            options={positions}
            groupBy={(option) => {
              return option.topIssue?.name;
            }}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={positionsById[state.position] || null}
            variant="outlined"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search all Issues"
                variant="outlined"
                // value={state.position}
              />
            )}
            onChange={(event, item) => {
              onChangeField('position', item?.id);
            }}
          />
        </Grid>
        <Grid item xs={8} lg={3}>
          <Autocomplete
            options={states}
            value={states[state.state] || null}
            fullWidth
            variant="outlined"
            autoSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by state"
                variant="outlined"
                // value={states[state.state]}
                // value="tomer"
              />
            )}
            onChange={(event, item) => {
              onChangeField('state', states.indexOf(item));
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          {routeState === 'ME' && (
            <ButtonWrapper>
              <BlackButton onClick={() => setShowVoteModal(true)}>
                <InnerButton>Check My Voter Registration</InnerButton>
              </BlackButton>
            </ButtonWrapper>
          )}
        </Grid>
      </Grid>
      <Modal
        open={showVoteModal}
        closeModalCallback={() => setShowVoteModal(false)}
        showCloseButton={false}
      >
        <CheckVoteRegistration
          closeModalCallback={() => setShowVoteModal(false)}
        />
      </Modal>
    </Wrapper>
  );
}

export default FiltersSection;
