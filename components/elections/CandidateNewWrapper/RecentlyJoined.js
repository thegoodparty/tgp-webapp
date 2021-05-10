/**
 *
 * RecentlyJoined
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Truncate from 'react-truncate';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-scroll';

import { Body9, Body11, Body13, Body19, Body } from '../../shared/typogrophy';
import { getUserCookie } from '../../../helpers/cookieHelper';
const PeopleJoinedIconPurple = '/images/people-joined-purple.svg';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

// const InnerButton = styled.div`
//   font-size: 14px;
// `;

const RecentActivity = styled.div`
  margin-top: 32px;
`;
const RecentActivityTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;
  font-weight: 600;
  text-align: left;
`;

const JoinedCount = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-left: 16px;
`;

const JoinName = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  font-weight: 600;
`;

const JoinTime = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Message = styled(Body)`
  margin-top: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 16px;
  }
`;

const SeeMore = styled.div`
  font-size: 13px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.purple};
  margin-top: 8px;
  cursor: pointer;
`;

const RecentJoin = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grayD};
  text-align: left;
  position: relative;
`;

const AdminDelete = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 0 5px 5px;
  font-size: 12px;
  color: red;
  cursor: pointer;
`;

function RecentlyJoined({
  candidateSupports,
  adminDeleteSupportCallback,
  candidateId,
  total,
  previewMode,
  scrollForMore,
}) {
  const supporters = candidateSupports || [];
  let displaySupporters = supporters;
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [truncated, setTruncated] = useState(false);
  if (previewMode && !showAll) {
    displaySupporters = displaySupporters.slice(0, 2);
  }

  const user = getUserCookie(true);
  const { isAdmin } = user;

  const lines = 3;

  const handleTruncate = isTruncated => {
    if (truncated !== isTruncated) {
      setTruncated(isTruncated);
    }
  };

  const toggleLines = e => {
    e.preventDefault();

    setExpanded(!expanded);
  };

  const handleShowMore = () => {
    if (scrollForMore) {
    } else {
      setShowAll(!showAll);
    }
  };
  return (
    <>
      <RecentActivity>
        <RecentActivityTitle>Recent Activity</RecentActivityTitle>
      </RecentActivity>
      <Grid container alignItems="center" style={{ marginBottom: 14 }}>
        <img src={PeopleJoinedIconPurple} alt="share" />
        <JoinedCount>
          {total} {total === 1 ? 'person has' : 'people have'} taken action
        </JoinedCount>
      </Grid>
      {displaySupporters.map(supporter => (
        <RecentJoin key={supporter.id}>
          {isAdmin && (
            <AdminDelete
              onClick={() => {
                adminDeleteSupportCallback(supporter.id, candidateId);
              }}
            >
              <DeleteForeverIcon />
            </AdminDelete>
          )}
          <img
            src={AnonymousIconPurple}
            alt="share"
            style={{ marginRight: '18px' }}
          />
          <div>
            <JoinName>{supporter.user || 'Someone'}</JoinName>
            <JoinTime>
              {supporter.type}d {supporter.timeAgo}
            </JoinTime>
            {supporter.message && (
              <Message>
                <Truncate
                  lines={!expanded && lines}
                  ellipsis={
                    <span>
                      ...{' '}
                      <a href="#" onClick={toggleLines}>
                        More
                      </a>
                    </span>
                  }
                  onTruncate={handleTruncate}
                >
                  {supporter.message}
                </Truncate>
                {!truncated && expanded && (
                  <span>
                    {' '}
                    <a href="#" onClick={toggleLines}>
                      Less
                    </a>
                  </span>
                )}
              </Message>
            )}
          </div>
        </RecentJoin>
      ))}
      {previewMode && (
        <>
          {scrollForMore ? (
            <Link to="recently-all" duration={350} smooth>
              <SeeMore>See {showAll ? 'Less' : 'More'}</SeeMore>
            </Link>
          ) : (
            <SeeMore onClick={handleShowMore}>
              See {showAll ? 'Less' : 'More'}
            </SeeMore>
          )}
        </>
      )}

      {/*<Box style={{ marginTop: 24 }}>*/}
      {/*  <PurpleButton fullWidth className="outline">*/}
      {/*    <InnerButton>*/}
      {/*      <span>SEE ALL</span>*/}
      {/*    </InnerButton>*/}
      {/*  </PurpleButton>*/}
      {/*</Box>*/}
    </>
  );
}

RecentlyJoined.propTypes = {
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  adminDeleteSupportCallback: PropTypes.func,
  candidateId: PropTypes.number,
  total: PropTypes.number,
};

export default RecentlyJoined;
