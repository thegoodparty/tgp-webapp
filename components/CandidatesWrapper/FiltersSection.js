/**
 *
 * TopSection
 *
 */

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { CandidatesContext } from '/containers/CandidatesPage';
import Row from '../shared/Row';

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
  &:hover {
    background-color: #dddddd;
  }
`;

const Relative = styled.div`
  position: relative;
`;

const PositionsWrapper = styled.div`
  height: 110px;
  overflow: hidden;
`;

const More = styled.div`
  background-color: #fff;
  margin-top: 15px;
  text-decoration: underline;
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    position: absolute;
    bottom: 6px;
    right: 0;
    padding: 8px 0 8px 15px;
  }
`;

function FiltersSection() {
  const {
    positions,
    positionsByTopIssues,
    states,
    filterCandidatesCallback,
    routePosition,
    routeState,
  } = useContext(CandidatesContext);

  const [state, setState] = useState({
    position: '',
    state: '',
  });

  const [positionsById, setPositionsById] = useState({});

  const [showMoreIssues, setShowMoreIssues] = useState(false);

  useEffect(() => {
    const byId = {};
    positions.forEach((position) => {
      byId[position.id] = position;
    });
    setPositionsById(byId);
  }, [positions]);

  useEffect(() => {
    if (Object.keys(positionsById).length > 0) {
      let position = '';
      let state = '';
      if (routePosition && routePosition !== 'all') {
        position = parseInt(routePosition.split('|')[1], 10);
      }
      if (routeState) {
        state = states.findIndex((item) => item === routeState);
      }
      setState({
        position,
        state,
      });
      setShowMoreIssues(false);
    }
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

  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between' }}>
        <H2>Filter by Top Issues</H2>
        <Hidden mdDown>
          <div style={{ minWidth: '200px' }}>
            <Autocomplete
              options={states}
              value={states[state.state]}
              fullWidth
              variant="outlined"
              autoSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by state"
                  variant="outlined"
                  value={state.state}
                />
              )}
              onChange={(event, item) => {
                onChangeField('state', states.indexOf(item));
              }}
            />
            {/*<Select*/}
            {/*  variant="outlined"*/}
            {/*  native*/}
            {/*  value={state.state}*/}
            {/*  onChange={(e) => {*/}
            {/*    onChangeField('state', e.target.value);*/}
            {/*  }}*/}
            {/*  id="state-filter"*/}
            {/*>*/}
            {/*  <option value="">Filter by state</option>*/}
            {/*  {(states || []).map((state, index) => (*/}
            {/*    <option value={index} key={state}>*/}
            {/*      {state}*/}
            {/*    </option>*/}
            {/*  ))}*/}
            {/*</Select>*/}
          </div>
        </Hidden>
      </Row>
      <Relative>
        <PositionsWrapper>
          {positions.map((position) => (
            <Pill
              key={position.id}
              onClick={() => {
                onChangeField('position', position.id);
              }}
            >
              {position.name} ({position.candidates?.length})
            </Pill>
          ))}
        </PositionsWrapper>
        <More>
          {!showMoreIssues ? (
            <div onClick={() => setShowMoreIssues(true)}>See all issues</div>
          ) : (
            <Select
              variant="outlined"
              native
              value={state.position}
              onChange={(e) => {
                onChangeField('position', e.target.value);
              }}
              id="issue-filter"
            >
              <option value="">All Issues</option>
              {positionsByTopIssues && (
                <>
                  {(Object.keys(positionsByTopIssues) || []).map((issue) => (
                    <>
                      <optgroup label={issue}>{issue}</optgroup>
                      {positionsByTopIssues[issue].map((position) => (
                        <option value={position.id} key={position.id}>
                          &nbsp; {position.name}
                        </option>
                      ))}
                    </>
                  ))}
                </>
              )}
            </Select>
          )}
        </More>
      </Relative>
    </Wrapper>
  );
}

export default FiltersSection;
