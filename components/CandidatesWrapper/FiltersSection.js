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
import IssuePositionsPickerContainer from '/containers/shared/IssuePositionsPickerContainer';

import { FontH3 } from '../shared/typogrophy';
import BlackButton from '../shared/buttons/BlackButton';
import Modal from '../shared/Modal';
import BlackOutlinedButton from '../shared/buttons/BlackOutlinedButton';
import { PositionPill } from '../shared/IssuePositionsPickerWrapper';

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

const FilterBtn = styled.div`
  display: inline-block;
  padding: 8px;
  border: solid 1px #000;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Border = styled.div`
  display: inline-block;
  color: #e6e6e6;
  margin: 0 16px;
`;

const ModalInner = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  min-width: 50vw;
  max-width: 80vw;
  height: 90vh;
  overflow-x: auto;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 12px;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
`;

function FiltersSection() {
  const {
    candidates,
    positions,
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

  useEffect(() => {
    let position = '';
    let state = '';
    if (routePosition && routePosition !== 'all') {
      const positionId = parseInt(routePosition.split('|')[1], 10);
      position = positions.findIndex((item) => {
        return item.id === positionId;
      });
    }
    if (routeState) {
      state = states.findIndex((item) => item === routeState);
    }
    setState({
      position,
      state,
    });
  }, [routePosition, routeState]);

  const onChangeField = (key, val) => {
    const newState = {
      ...state,
      [key]: val,
    };
    setState(newState);
    filterCandidatesCallback(
      positions[newState.position],
      states[newState.state],
    );
  };

  return (
    <>
      <Section>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={9}>
            <FontH3 style={{ margin: 0 }}>
              {candidates.length} Good Certified Candidates{' '}
              {state.position !== '' && state.position !== -1 ? (
                <>
                  who care about{' '}
                  <span>#{positions[state.position].name} &nbsp;</span>
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
            <Select
              variant="outlined"
              native
              value={state.position}
              onChange={(e) => {
                onChangeField('position', e.target.value);
              }}
            >
              <option value="">All Top Issues</option>
              {(positions || []).map((position, index) => (
                <option value={index} key={position.id}>
                  {position.name}
                </option>
              ))}
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
