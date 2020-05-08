import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import StarsIcon from '@material-ui/icons/Stars';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/ChevronLeft';
import OpenIcon from '@material-ui/icons/ChevronRight';

import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H1 } from 'components/shared/typogrophy/index';
import heartImg from 'images/heart.svg';

import AdminCandidateList from '../AdminCandidateList/Loadable';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: row;
  padding-top: 18px;
`;

const LeftPanel = styled.div`
  width: 250px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07), 0px 0px 12px rgba(0, 0, 0, 0.08),
    0px 0px 16px rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
  transition: 0.3s width;

  &.close {
    width: 48px;
  }
`;

const LeftMenuItem = styled(MenuItem)`
  && {
    padding: 16px 12px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
    color: ${({ theme }) => theme.colors.blue};
    &.selected {
      background-color: ${({ theme }) => theme.colors.lighterBlue};
    }
  }
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const Icon = styled.span`
  margin-right: 12px;
`;

const IconLabel = styled(Body13)`
  display: inline-block;
`;

const MainPanel = styled.div`
  flex: 1;
`;

const MainPanelPlaceholder = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heart = styled.img`
  width: 80px;
  height: auto;
  margin-top: 12px;
`;

const leftMenuItems = [
  { icon: <StarsIcon />, label: 'Presidential Candidates' },
  { icon: <AccountBalanceIcon />, label: 'Senate Candidates' },
  { icon: <HomeIcon />, label: 'House Candidates' },
];

const AdminWrapper = ({
  user,
  candidates,
  loadCandidatesCallback,
  updateCandidateCallback,
  loading,
  error,
}) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);

  const handleSelectedItem = index => {
    setSelectedItem(index);
    if (index === 0 || index === 1 || index === 2) {
      const chamber = mapChamber(index);
      loadCandidatesCallback(chamber);
    }
  };

  const mapChamber = index => {
    if (index === 0) {
      return 'presidential';
    }
    if (index === 1) {
      return 'senate';
    }
    if (index === 2) {
      return 'house';
    }
    return null;
  };

  const mainContent = () => {
    if (loading) {
      return (
        <MainPanelPlaceholder>
          <H1>Loading</H1>
          <CircularProgress />
        </MainPanelPlaceholder>
      );
    }
    if (selectedItem === false) {
      return (
        <MainPanelPlaceholder>
          <H1>Admin Dashboard</H1>
          <Heart src={heartImg} />
        </MainPanelPlaceholder>
      );
    }
    const chamber = mapChamber(selectedItem);
    return (
      <AdminCandidateList
        candidates={candidates}
        updateCandidateCallback={updateCandidateCallback}
        chamber={chamber}
      />
    );
  };

  const toggleLeftPanel = () => {
    setLeftOpen(!leftOpen);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <MobileHeader />
      {user && user.isAdmin && (
        <Wrapper>
          <LeftPanel className={leftOpen ? 'open' : 'close'}>
            <LeftMenuItem onClick={toggleLeftPanel}>
              <CloseWrapper>
                {leftOpen ? <CloseIcon /> : <OpenIcon />}
              </CloseWrapper>
            </LeftMenuItem>
            {leftMenuItems.map((item, index) => (
              <LeftMenuItem
                key={item.label}
                onClick={() => {
                  handleSelectedItem(index);
                }}
                className={selectedItem === index ? 'selected' : ''}
              >
                <Icon>{item.icon}</Icon>
                <IconLabel>{item.label}</IconLabel>
              </LeftMenuItem>
            ))}
          </LeftPanel>
          <MainPanel>{mainContent()}</MainPanel>
        </Wrapper>
      )}
    </div>
  );
};

AdminWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadCandidatesCallback: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateCandidateCallback: PropTypes.func,
};

export default AdminWrapper;
