import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { H1, Body, H3, Body13 } from 'components/shared/typogrophy';
import checkboxImg from 'images/icons/checkbox-gray.svg';

const Wrapper = styled.div`
  padding: 8px 2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Checkbox = styled.img`
  width: 24px;
  height: auto;
  margin-top: 12px;
  margin-right: 8px;
`;

const Green = styled.span`
  color: ${({ theme }) => theme.colors.green};
`;

const Label = styled(Body)`
  font-weight: 600;
  display: inline-block;
  padding-top: 9px;
`;

const FiltersPopup = () => {
  return (
    <Wrapper onClick={e => e.stopPropagation()}>
      <H1>Good Criteria</H1>
      <Body style={{ marginTop: '10px', marginBottom: '32px' }}>
        To be a{' '}
        <Green>
          <strong>Potentially Good</strong>
        </Green>{' '}
        option, candidates must pass <u>both</u> our{' '}
        <strong>Follow the Money</strong> and <strong>Character Check</strong>{' '}
        criteria below:
      </Body>
      <H3>Follow the Money</H3>
      <Row style={{ marginTop: '18px' }}>
        <Checkbox src={checkboxImg} />
        <div style={{ flex: 1 }}>
          <Label>Mostly Funded by Small Donors (&lt;$200)</Label>
          <Body13 style={{ flex: 1 }}>
            Major candidates who have raised lots of funding, but have ensured
            that most of their funding (&gt;50%) is coming from Small Individual
            Donors (&lt;$200).
          </Body13>
        </div>
      </Row>
      <div className="text-center" style={{ marginTop: '24px' }}>
        <Body13>or</Body13>
      </div>
      <Row style={{ marginTop: '18px' }}>
        <Checkbox src={checkboxImg} />
        <div style={{ flex: 1 }}>
          <Label>Relatively Small Amount of Funding</Label>
          <Body13>
            Relatively lessor known candidates who have raised less than half
            (&lt;50%) of the funding of the incumbent in race.
          </Body13>
        </div>
      </Row>

      <H3 style={{ marginTop: '24px', marginBottom: '12px' }}>
        Character Check
      </H3>
      <Row>
        <Checkbox src={checkboxImg} />
        <div style={{ flex: 1 }}>
          <Label>Vetted for Hate-Speech</Label>
          <Body13>
            Candidate has not engaged in a pattern of activities or{' '}
            <Link to="?article=5bwvf0PwsbpFEe8IJ9sHhX">hate-speech</Link> that
            encourages intolerance, discrimination or hostility towards a
            constitutionally or state-protected group or class.
          </Body13>
        </div>
      </Row>
    </Wrapper>
  );
};

FiltersPopup.propTypes = {};

export default FiltersPopup;
