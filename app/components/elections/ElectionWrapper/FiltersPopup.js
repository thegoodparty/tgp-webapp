import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import { H1, Body, H3, Body13 } from 'components/shared/typogrophy';
import { defaultFilters } from 'helpers/electionsHelper';

const Wrapper = styled.div`
  padding: 8px 2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const GreenH3 = styled(H3)`
  color: ${({ theme }) => theme.colors.green};
`;

const RedH3 = styled(H3)`
  color: ${({ theme }) => theme.colors.orange};
  margin: 36px 0 18px;
`;

const Label = styled(Body)`
  font-weight: 600;
  display: inline-block;
  padding-top: 9px;
`;

const FiltersPopup = () => {
  return (
    <Wrapper onClick={e => e.stopPropagation()}>
      <H1>Filter Candidates</H1>
      <Body style={{ marginTop: '10px', marginBottom: '32px' }}>
        Choose how to filter candidates as Good Options, Not Good Enough or
        Unknown:
      </Body>
      <GreenH3>GOOD OPTIONS</GreenH3>
      <Row style={{ marginTop: '18px' }}>
        <Checkbox
          checked
          disabled
          color="primary"
          inputProps={{ 'aria-label': 'Mostly Founded by Small Donors' }}
        />
        <div>
          <Label>Mostly Funded by Small Donors (&lt;$200)</Label>
          <Body13>
            Major candidates who have raised lots of funding, but have ensured
            that most of their funding (&gt;50%) is coming from Small Individual
            Donors (&lt;$200).
          </Body13>
        </div>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Checkbox
          checked
          disabled
          color="primary"
          inputProps={{ 'aria-label': 'Relatively Small Amount of Funding' }}
        />
        <div>
          <Label>Good Party Approved Challengers</Label>
          <Body13>
            Relatively lessor known candidates who have raised little funding
            (&lt;50% of the incumbent), but have been vetted and approved by The
            Good Party.
          </Body13>
        </div>
      </Row>
      <RedH3>NOT GOOD ENOUGH</RedH3>
      <Row>
        <Checkbox
          checked
          disabled
          color="primary"
          inputProps={{ 'aria-label': 'Mostly Funded by Big Money Donors' }}
        />
        <div>
          <Label>Mostly Funded by Big Money Donors</Label>
          <Body13>
            Major candidates who have raised lots of funding, but have a
            majority (&gt;50%) coming from Big Money sources, like Corporate
            Lobbyists, Political Action Committees (PACs), and other Big Money
            Donors.
          </Body13>
        </div>
      </Row>
    </Wrapper>
  );
};

FiltersPopup.propTypes = {};

export default FiltersPopup;
