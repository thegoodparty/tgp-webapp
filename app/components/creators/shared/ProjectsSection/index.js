/**
 *
 * ProjectsSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Share from 'images/icons/share_square.svg';
import Plus from 'images/icons/suggest_plus.svg';
import { ProjectButton } from '../buttons';
import { ListProject, ShareModal } from '../modals';
import Project from '../Project';

const SectionWrapper = styled.div`
  padding: 6rem 8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
    padding: 4rem 4.5rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    padding: 2.5rem 1rem;
  }
`;
const SectionHeader = styled.div`
  margin-bottom: 2rem;
  align-items: center;
  @media only screen and (min-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    padding: 0 1rem;
  }
`;
const Title = styled.h2`
  font: normal 800 64px normal;
  font-family: unset;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsContent}) {
    font-size: 40px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
    font-size: 27px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    margin-bottom: 1.5rem;
  }
`;

const SectionHeaderActions = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    align-items: center;
  }
`;

const ProjectIcon = styled.img`
  display: block;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    display: none;
  }
`;
const ProjectButtonLink = styled.a`
  @media only screen and (min-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    width: 100%;
  }
`;
function ProjectsSection({ projects, user, toggleJoin }) {
  const [listProject, setListProject] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [limit, setLimit] = useState(6);

  const onCloseShareModal = () => {
    setShowShareModal(false);
  };
  const onClickShareButton = () => {
    setShowShareModal(true);
  }
  return (
    <SectionWrapper>
      <SectionHeader>
        <Title>Projects</Title>
        <SectionHeaderActions>
          <ProjectButton variant="contained" className="share-button" onClick={onClickShareButton}>
            <ProjectIcon src={Share} style={{ marginRight: '0.5rem' }} /> Share
          </ProjectButton>
          <ProjectButtonLink
            href="https://docs.google.com/forms/d/1sFLfwwoTGOOLKXUSytTCiN3WsVAx0zRSCktUVcYEbGQ/viewform?edit_requested=true"
            target="_blank"
          >
            <ProjectButton variant="contained">
              <ProjectIcon src={Plus} style={{ marginRight: '0.5rem' }} /> Suggest a Project
            </ProjectButton>
            <ListProject
              open={listProject}
              handleClose={() => setListProject(false)}
            />
          </ProjectButtonLink>
        </SectionHeaderActions>
      </SectionHeader>
      {projects.slice(0, limit).map(project => (
        <Project
          project={project}
          key={project.id}
          user={user}
          toggleJoin={toggleJoin}
        />
      ))}
      {projects && limit < projects.length && (
        <Project showMore clickShowMore={() => setLimit(limit + 6)} />
      )}
      <ShareModal
        open={showShareModal}
        handleClose={onCloseShareModal}
        user={user}
      />
    </SectionWrapper>
  );
}

ProjectsSection.propTypes = {
  projects: PropTypes.array,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleJoin: PropTypes.func
};

export default ProjectsSection;
