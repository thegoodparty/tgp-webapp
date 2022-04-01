/**
 *
 * PortalUpdatesWrapper
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

import { PortalUpdatesPageContext } from '/containers/candidate-portal/CandidatePortalUpdatesPage';
import PortalPageWrapper from '../shared/PortalPageWrapper';
import PortalPanel from '../shared/PortalPanel';
import { FontH3 } from '../../shared/typogrophy';
import Update from './Update';
import AddCampaignUpdateModal from '../shared/AddCampaignUpdateModal';

function PortalUpdatesWrapper() {
  const { role, candidate } = useContext(PortalUpdatesPageContext);
  const [editUpdate, setEditUpdate] = useState(false);
  const editCallback = (update) => setEditUpdate(update);
  const closeModalCallback = () => setEditUpdate(false);

  return (
    <PortalPageWrapper role={role} title="Edit Campaign Page">
      <PortalPanel color="#963D97">
        <Row>
          <FontH3 style={{ margin: '0 0 45px 0' }}>Updates</FontH3>
          <AddCampaignUpdateModal
            context={PortalUpdatesPageContext}
            editUpdate={editUpdate}
            closeModalCallback={closeModalCallback}
          />
        </Row>
        {(candidate?.updatesList || []).map((update, index) => (
          <Update
            update={update}
            last={index === candidate?.updatesList?.length - 1}
            editCallback={editCallback}
          />
        ))}{' '}
      </PortalPanel>
    </PortalPageWrapper>
  );
}

PortalUpdatesWrapper.propTypes = {};

export default PortalUpdatesWrapper;
