/**
 *
 * RecentlyJoined
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-scroll';

import { Body11, Body13, Body } from '../../shared/typogrophy';
import { getUserCookie } from '../../../helpers/cookieHelper';
import { getDisplayName } from '../../../helpers/userHelper';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

const JoinName = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  font-weight: 600;
  display: inline-block;
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;

const JoinTime = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
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

const JoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const RecentJoin = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 0;
  text-align: left;
  position: relative;
  font-size: 13px;
`;

const AdminDelete = styled.div`
  position: absolute;
  top: 6px;
  right: 0;
  padding: 5px 0 5px 5px;
  font-size: 12px;
  color: red;
  cursor: pointer;
`;

const Img = styled.img`
  margin-right: 8px;
  height: 32px;
  width: 32px;
`;

function RecentlyJoined({
  candidateSupports,
  adminDeleteSupportCallback,
  candidateId,
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

  const supportUser = supporter => {
    if (!supporter || !supporter.user) {
      return 'Anonymous';
    }
    if (typeof supporter.user === 'string') {
      return supporter.user;
    }
    if (typeof supporter.user === 'object') {
      return getDisplayName(supporter.user);
    }
    return 'Anonymous';
  };
  return (
    <div style={{ marginTop: '14px' }}>
      {displaySupporters.map(supporter => (
        <RecentJoin key={supporter.id}>
          {isAdmin && (
            <AdminDelete
              onClick={() => {
                adminDeleteSupportCallback(supporter.id, candidateId);
              }}
            >
              <DeleteForeverIcon style={{ fontSize: '22px' }} />
            </AdminDelete>
          )}
          <Img src={AnonymousIconPurple} alt="share" />
          <JoinWrapper>
            <JoinName>{supportUser(supporter)}</JoinName>
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
          </JoinWrapper>
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
    </div>
  );
}

RecentlyJoined.propTypes = {
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  adminDeleteSupportCallback: PropTypes.func,
  candidateId: PropTypes.number,
  previewMode: PropTypes.bool,
  scrollForMore: PropTypes.bool,
};

export default RecentlyJoined;
