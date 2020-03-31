import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';

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

const CloseWrapper = styled.div`
  text-align: right;
  cursor: pointer;
`;

const FiltersPopup = ({
  filters = defaultFilters,
  changeFiltersCallback = () => {},
  closeCallback = () => {},
}) => {
  const { smallDonors, smallFunding, mostlyBigDonors } = filters;

  const handleCheck = (event, filter) => {
    event.stopPropagation();
    const updatedFilters = {
      ...filters,
      ...filter,
    };
    changeFiltersCallback(updatedFilters);
  };
  return (
    <Wrapper onClick={e => e.stopPropagation()}>
      <CloseWrapper onClick={closeCallback}>
        <CloseIcon />
      </CloseWrapper>
      <H1>Filter Candidates</H1>
      <Body style={{ marginTop: '10px', marginBottom: '32px' }}>
        Choose how to filter candidates into Good Enough or Not Good Enough:
      </Body>
      <GreenH3>Good Enough</GreenH3>
      <Row
        style={{ marginTop: '18px' }}
        onClick={e => handleCheck(e, { smallDonors: !smallDonors })}
      >
        <Checkbox
          checked={smallDonors}
          color="primary"
          inputProps={{ 'aria-label': 'Mostly Founded by Small Donors' }}
        />
        <div>
          <Label>Mostly Funded by Small Donors (&lt;$200)</Label>
          <Body13>
            Major candidates who have raised lots of funding, but have ensured
            that most of their funding (&gt;50%) is coming from Small Individual
            Donors(&lt;$200).
          </Body13>
        </div>
      </Row>

      <Row
        style={{ marginTop: '24px' }}
        onClick={e => handleCheck(e, { smallFunding: !smallFunding })}
      >
        <Checkbox
          checked={smallFunding}
          color="primary"
          inputProps={{ 'aria-label': 'Relatively Small Amount of Funding' }}
        />
        <div>
          <Label>Good Party Approved Candidates</Label>
          <Body13>
            Relatively lessor known candidates who have raised &lt;50% of the
            funding of the incumbent, and have been vetted and approved by The
            Good Party.
          </Body13>
        </div>
      </Row>
      <RedH3>Not Good Enough</RedH3>
      <Row onClick={e => handleCheck(e, { mostlyBigDonors: !mostlyBigDonors })}>
        <Checkbox
          checked={mostlyBigDonors}
          onChange={e => handleCheck(e, { mostlyBigDonors: !mostlyBigDonors })}
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

FiltersPopup.propTypes = {
  filters: PropTypes.object,
  changeFiltersCallback: PropTypes.func,
  closeCallback: PropTypes.func,
};

export default FiltersPopup;
