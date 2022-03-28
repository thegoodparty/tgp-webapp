/**
 *
 * FiltersSection
 *
 */

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sticky from 'react-sticky-el';
import Select from '@material-ui/core/Select';

import { CandidatesContext } from '/containers/CandidatesPage';

import { FontH3 } from '../shared/typogrophy';
import BlackButton from '../shared/buttons/BlackButton';

const Section = styled.section`
  padding: 16px 28px;
  background-color: #fafafa;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ShareWrapper = styled.div`
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: right;
  }
`;

const InnerButton = styled.div`
  padding: 0 24px;
  font-size: 12px;
`;

const FilterBy = styled.div`
  padding: 16px 28px;
  border-top: solid 1px #e6e6e6;
  background-color: #fafafa;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const StickyWrapper = styled.div`
  .sticky {
    z-index: 10;
  }
  .sticky .sticky-el {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  }
`;

function FiltersSection() {
  const {
    candidates,
    positions,
    positionsByTopIssues,
    states,
    filterCandidatesCallback,
    routePosition,
    routeState,
  } = useContext(CandidatesContext);

  const router = useRouter();
  const [state, setState] = useState({
    position: '',
    state: '',
  });
  const [positionsById, setPositionsById] = useState({});

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
    <>
      <Section>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={9}>
            <FontH3 style={{ margin: 0 }}>
              {candidates.length} Good Certified Candidate
              {candidates.length !== 1 ? 's ' : ' '}
              {state.position !== '' && state.position !== -1 ? (
                <>
                  who care about{' '}
                  <span>#{positionsById[state.position]?.name} &nbsp;</span>
                </>
              ) : (
                <>who people should know about</>
              )}
              {state.state !== '' && state.state !== -1 && (
                <>
                  in <span>{states[state.state]}</span>
                </>
              )}
            </FontH3>
          </Grid>
          <Grid item xs={12} lg={3}>
            <ShareWrapper>
              Spread the word! &nbsp;{' '}
              <Link href={`${router.asPath}?share=true`} passHref>
                <a>
                  <BlackButton style={{ marginLeft: '24px' }}>
                    <InnerButton>Share</InnerButton>
                  </BlackButton>
                </a>
              </Link>
            </ShareWrapper>
          </Grid>
        </Grid>
      </Section>
      <StickyWrapper>
        <Sticky>
          <FilterBy className="sticky-el">
            <strong>Filter By</strong> &nbsp; &nbsp;
            <Select
              variant="outlined"
              native
              value={state.position}
              onChange={(e) => {
                onChangeField('position', e.target.value);
              }}
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
            &nbsp; &nbsp;
            <Select
              variant="outlined"
              native
              value={state.state}
              onChange={(e) => {
                onChangeField('state', e.target.value);
              }}
            >
              <option value="">All States</option>
              {(states || []).map((state, index) => (
                <option value={index} key={state}>
                  {state}
                </option>
              ))}
            </Select>
            {/*{positionNames && positionNames.length > 0 && <Border>|</Border>}*/}
            {/*{(positionNames || []).map((position) => (*/}
            {/*  <PositionPill key={position}>{position}</PositionPill>*/}
            {/*))}*/}
          </FilterBy>
        </Sticky>
      </StickyWrapper>
    </>
  );
}

export default FiltersSection;
