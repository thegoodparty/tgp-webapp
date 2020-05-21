/**
 *
 * Project
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { Mail, Favorite, Share } from '@material-ui/icons';
import NotionIcon from 'images/icons/notion.svg';
import FigmaIcon from 'images/icons/figma.svg';
import MessageIcon from 'images/icons/message.svg';
import ShareIcon from 'images/icons/share1.svg';
import FavoriteIcon from 'images/icons/favorite.svg';
import Collaborators from '../Collaborators';
import { ProjectProposal } from '../modals';

const ProjectWrapper = styled.div`
  border-radius: 16px;
  padding: 2rem;
  background-color: #fff;
  margin-bottom: 2rem;
  &.show-more {
    cursor: pointer;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
const ProjectBodyWrapper = styled(Grid)`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.creators.colors.gray2};
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding-bottom: 1.5rem;
  }
`;

const ProjectContent = styled(Grid)`
  && {
    padding-right: 2rem;
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsContent}) {
      padding-right: 0;
      order: 1;
    }
  }
`;

const Title = styled.h3`
  font: normal bold 32px/130% normal;
  font-family: unset;
  color: #000;
  margin: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 27px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 17px;
    margin-bottom: 0.5rem;
  }
`;

const Topics = styled.div`
  margin-bottom: 1.5rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    margin-bottom: 1rem;
  }
`;

const Topic = styled.span`
  background-color: ${({ theme }) => theme.creators.colors.lightGray};
  color: #fff;
  border-radius: 0.3rem;
  font: normal 600 10px normal;
  font-family: unset;
  padding: 0.3rem 0.5rem;
  margin-right: 0.6rem;
  cursor: pointer;
`;

const Summary = styled.p`
  font: normal normal 17px/140% normal;
  font-family: unset;
  color: #000;
  margin-bottom: 1.5rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
    margin-bottom: 1rem;
  }
`;
const OuterLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const OuterLink = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 15px/22px normal;
  font-family: unset;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
  }
`;

const LinkIcon = styled.img`
  margin-right: 0.7rem;
  position: relative;
  top: -1px;
`;

const ProjectFooter = styled(Grid)`
  padding-top: 2rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
    padding-top: 1rem;
  }
`;

const FooterAction = styled.a`
  color: ${({ theme }) => theme.creators.colors.lightGray};
  font: normal 600 16px/40px normal;
  font-family: unset;
  text-transform: uppercase;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    margin-right: 1rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    margin-right: 2rem;
    font-size: 13px;
    order: 2;
    &.favorite {
      order: 0;
    }
  }
`;

const FooterActionIcon = styled.span`
  margin-right: 1rem;
  position: relative;
  top: -2px;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    top: -1px;
    margin-right: 0.5rem;
  }
`;

const FooterActions = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    justify-content: space-between;
  }
`;

const FooterActionsWrapper = styled(Grid)`
  && {
    display: flex;
    align-items: center;
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsContent}) {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.creators.colors.gray2};
    }
  }
`;
const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
`;
const ShowMore = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 1.1rem/100% normal;
  font-family: unset;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
  }
`;

const CollaboratorContainer = styled(Grid)`
  && {
    display: flex;
    align-items: center;
  }
`;

const ProjectImageWrapper = styled(Grid)`
  && {
    @media only screen and (max-width: ${({ theme }) =>
        theme.creators.breakpoints.creatorsContent}) {
      order: 0;
      margin-bottom: 1.5rem;
    }
  }
`;
function Project({ project, showMore = false }) {
  const [touch, setTouch] = useState(false);

  if (showMore) {
    return (
      <ProjectWrapper className="text-center show-more">
        <ShowMore>Show More</ShowMore>
      </ProjectWrapper>
    );
  }
  return (
    <ProjectWrapper>
      <ProjectBodyWrapper container>
        <ProjectContent item xs={12} lg={7}>
          <Title onClick={() => setTouch(true)}>{project.title}</Title>
          <ProjectProposal
            project={project}
            open={touch}
            handleClose={() => setTouch(false)}
          />
          <Topics>
            {project.topics.map((topic, index) => (
              <Topic key={index}>{topic}</Topic>
            ))}
          </Topics>
          <Summary>{project.summary}</Summary>
          <div>
            {project.links.map((link, index) => {
              const icon = link.includes('notion') ? NotionIcon : FigmaIcon;
              return (
                <OuterLinkWrapper key={index}>
                  <OuterLink href={link} target="_blank">
                    <LinkIcon src={icon} alt="link icon" />
                    {link}
                  </OuterLink>
                </OuterLinkWrapper>
              );
            })}
          </div>
        </ProjectContent>
        <ProjectImageWrapper item xs={12} lg={5}>
          <ProjectImg src={`http:${project.images[0]}`} alt="project img" />
        </ProjectImageWrapper>
      </ProjectBodyWrapper>
      <ProjectFooter container>
        <CollaboratorContainer item xs={12} lg={7}>
          <Collaborators project={project} />
        </CollaboratorContainer>
        <FooterActionsWrapper item xs={12} lg={5}>
          <FooterActions>
            <FooterAction>
              <FooterActionIcon > <Mail /> </FooterActionIcon>
              I want to help
            </FooterAction>
            <FooterAction>
              <FooterActionIcon > <Share /> </FooterActionIcon>
              Share
            </FooterAction>
            <FooterAction className="favorite">
              <FooterActionIcon > <Favorite /> </FooterActionIcon>
              102
            </FooterAction>
          </FooterActions>
        </FooterActionsWrapper>
      </ProjectFooter>
    </ProjectWrapper>
  );
}

Project.propTypes = {
  showMore: PropTypes.bool,
  projects: PropTypes.array,
};

export default Project;
