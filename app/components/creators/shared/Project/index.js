/**
 *
 * Project
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import NotionIcon from 'images/icons/notion.svg';
import FigmaIcon from 'images/icons/figma.svg';
import MessageIcon from 'images/icons/message.svg';
import ShareIcon from 'images/icons/share1.svg';
import FavoriteIcon from 'images/icons/favorite.svg';
import Collaborators from '../Collaborators';
import { TouchProject } from '../modals';

const ProjectWrapper = styled.div`
  border-radius: 16px;
  padding: 2rem;
  background-color: #fff;
  margin-bottom: 2rem;
  &.show-more {
    cursor: pointer;
  }
  
`;
const ProjectBodyWrapper = styled(Grid)`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.creators.colors.gray2};
`;

const ProjectContent = styled(Grid)`
  padding-right: 2rem;
`;

const Title = styled.h3`
  font: normal bold 2rem/130% ${({ theme }) => theme.typography.fontFamily};
  color: #000;
  margin: 0;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Topics = styled.div`
  margin-bottom: 1.5rem;
`;

const Topic = styled.span`
  background-color: ${({ theme }) => theme.creators.colors.lightGray};
  color: #fff;
  border-radius: 0.3rem;
  font: normal 600 0.6rem ${({ theme }) => theme.typography.fontFamily};
  padding: 0.3rem 0.5rem;
  margin-right: 0.6rem;
  cursor: pointer;
`;

const Summary = styled.p`
  font: normal normal 1.1rem/140% ${({ theme }) => theme.typography.fontFamily};
  color: #000;
  margin-bottom: 1.5rem;
`;
const OuterLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const OuterLink = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 1rem/22px ${({ theme }) => theme.typography.fontFamily};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkIcon = styled.img`
  margin-right: 0.7rem;
  position: relative;
  top: -1px;
`;

const ProjectFooter = styled(Grid)`
  padding-top: 2rem;
`;


const FooterAction = styled.a`
  color: ${({ theme }) => theme.creators.colors.lightGray};
  font: normal 600 1rem/40px ${({ theme }) => theme.typography.fontFamily};
  text-transform: uppercase;
  cursor: pointer;
`;

const FooterActionIcon = styled.img`
  margin-right: 1rem;
  position: relative;
  top: -2px;
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FooterActionsWrapper = styled(Grid)`
  && {
    display: flex;
    align-items: center;
  }
`;
const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
`;
const ShowMore = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 1.1rem/100% ${({ theme }) => theme.typography.fontFamily};
`;

const CollaboratorContainer = styled(Grid)`
  && {
    display: flex;
  }
`;

function Project({ project, showMore = false }) {
  const [ touch, setTouch ] = useState(false);
  
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
        <ProjectContent item xs={12} md={7}>
          <Title onClick={() => setTouch(true)}>{project.title}</Title>
          <TouchProject project={project} open={touch} handleClose={() => setTouch(false)} />
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
                <OuterLinkWrapper>
                  <OuterLink href={link} key={index} target="_blank">
                    <LinkIcon src={icon}  alt="link icon"/>
                    {link}
                  </OuterLink>
                </OuterLinkWrapper>
              );
            })}
          </div>
        </ProjectContent>
        <Grid item xs={12} md={5}>
          <ProjectImg src={`http:${project.images[0]}`} alt="project img"/>
        </Grid>
      </ProjectBodyWrapper>
      <ProjectFooter container>
        <CollaboratorContainer item xs={12} sm={7}>
          <Collaborators project={project} />
        </CollaboratorContainer>
        <FooterActionsWrapper item xs={12} sm={5}>
          <FooterActions>
            <FooterAction>
              <FooterActionIcon src={MessageIcon} alt="message icon"/>
              Message creators
            </FooterAction>
            <FooterAction>
              <FooterActionIcon src={ShareIcon} alt="share icon"/>
              Share
            </FooterAction>
            <FooterAction>
              <FooterActionIcon src={FavoriteIcon} alt="favorite icon"/>
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
