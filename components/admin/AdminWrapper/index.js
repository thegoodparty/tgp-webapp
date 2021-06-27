import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';

import MenuItem from '@material-ui/core/MenuItem';
import StarsIcon from '@material-ui/icons/Stars';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/ChevronLeft';
import OpenIcon from '@material-ui/icons/ChevronRight';
import UserIcon from '@material-ui/icons/Person';
import ArticletIcon from '@material-ui/icons/Assignment';
import StatsIcon from '@material-ui/icons/Equalizer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import LocationCityIcon from '@material-ui/icons/LocationCity';

import Nav from 'containers/shared/Nav';
import { Body13, H1 } from 'components/shared/typogrophy/index';

import AdminUsersList from '../AdminUsersList/Loadable';
import AdminArticlesFeedback from '../AdminArticlesFeedback/Loadable';
import AdminUserStats from '../AdminUserStats/Loadable';
import AdminVoterizeList from '../AdminVoterizeList/Loadable';
import NewCandidateList from '../AdminCandidateList/NewCandidateList';

const Wrapper = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  padding-top: 0;
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

const Heart = styled.div`
  width: 84px;
  height: 76px;
  margin: 12px auto;
  position: relative;
`;

const leftMenuItems = [
  { icon: <AccountBalanceIcon />, label: 'Candidates' },
  { icon: <UserIcon />, label: 'Users' },
  { icon: <ArticletIcon />, label: 'Articles' },
  { icon: <StatsIcon />, label: 'User Stats' },
  { icon: <HowToVoteIcon />, label: 'Voterize' },
];

const AdminWrapper = ({
  user,
  candidates,
  users,
  voterizeList,
  articles,
  isUpdated,
  loadCandidatesCallback,
  updateCandidateCallback,
  loadAllUsersCallback,
  loadArticleFeedbackCallback,
  loadVoterizeCallback,
  updateVoterizeCallback,
  deleteUserCallback,
  deleteCandidateCallback,
  loading,
  error,
  content,
}) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  const handleSelectedItem = index => {
    setSelectedItem(index);
    if (index === 0) {
      const chamber = 'local';
      loadCandidatesCallback(chamber);
    }
    if (index === 1 || index === 3) {
      if (!users) {
        loadAllUsersCallback();
      }
    }
    if (index === 2) {
      loadArticleFeedbackCallback();
    }
    if (index === 4) {
      loadVoterizeCallback();
    }
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
          <Heart>
            <Image src="/images/heart.svg" layout="fill" />
          </Heart>
        </MainPanelPlaceholder>
      );
    }
    if (selectedItem === 0) {
      return (
        <NewCandidateList
          candidates={candidates}
          updateCandidateCallback={updateCandidateCallback}
          chamber="local"
          deleteCandidateCallback={deleteCandidateCallback}
        />
      );
    }
    if (selectedItem === 1) {
      return (
        <AdminUsersList users={users} deleteUserCallback={deleteUserCallback} />
      );
    }
    if (selectedItem === 2) {
      return <AdminArticlesFeedback articles={articles} content={content} />;
    }
    if (selectedItem === 3) {
      return <AdminUserStats users={users} />;
    }
    if (selectedItem === 4) {
      return (
        <AdminVoterizeList
          voterizeList={voterizeList}
          updateVoterizeCallback={updateVoterizeCallback}
          isUpdated={isUpdated}
        />
      );
    }
    return (
      <MainPanelPlaceholder>
        <H1>Admin Dashboard</H1>
        <Heart src="/images/heart.svg" width="auto" height="auto" />
      </MainPanelPlaceholder>
    );
  };

  const toggleLeftPanel = () => {
    setLeftOpen(!leftOpen);
  };

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      {/* <MobileHeader /> */}
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
  voterizeList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadCandidatesCallback: PropTypes.func,
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  articles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadAllUsersCallback: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateCandidateCallback: PropTypes.func,
  loadArticleFeedbackCallback: PropTypes.func,
  deleteUserCallback: PropTypes.func,
  loadVoterizeCallback: PropTypes.func,
  updateVoterizeCallback: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isUpdated: PropTypes.bool,
  deleteCandidateCallback: PropTypes.func,
};

export default AdminWrapper;
