/**
 *
 * Project
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';
import Favorite from '@material-ui/icons/Favorite';
import Share from '@material-ui/icons/Share';
import NotionIcon from 'images/icons/notion.svg';
import FigmaIcon from 'images/icons/figma.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import Collaborators from '../Collaborators';
import { ProjectProposal } from '../modals';

const ProjectWrapper = styled.div`
  border-radius: 16px;
  padding: 2rem;
  background-color: #fff;
  margin-bottom: 2rem;
  box-shadow: 2px 8px 18px rgba(0, 0, 0, .15);
  &.show-more {
    cursor: pointer;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
const ProjectBodyWrapper = styled(Grid)`
  border-bottom: 1px solid ${({ theme }) => theme.creators.colors.gray2};
  padding-bottom: 24px;
`;

const ProjectContent = styled(Grid)`
  && {
    padding-right: 2rem;
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
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
    theme.creators.breakpoints.creatorsTablet}) {
    font-size: 27px;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    font-size: 17px;
    margin-bottom: 0.5rem;
  }
`;

const Topics = styled.div`
  margin-bottom: 1.5rem;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
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
  font: normal normal 16px/140% normal;
  font-family: unset;
  color: #000;
  margin: 0;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    font-size: 13px;
  }
  @media only screen and (min-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
    margin-bottom: 10px;
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
    theme.creators.breakpoints.creatorsMobile}) {
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
    theme.creators.breakpoints.creatorsMobile}) {
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
  margin-right: 0;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
    margin-right: 2.5rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    margin-right: 0;
    font-size: 13px;
  }
`;

const FooterActionIcon = styled.span`
  margin-right: 10px;
  position: relative;
  top: -2px;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    margin-right: 6px;
    top: -1px;
    margin-right: 0.5rem;
  }
`;

const FooterActions = styled.div`
  display: flex;
  width: 100%;
  
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
    // justify-content: space-between;
    padding-right: 1.5rem;
  }
  @media only screen and (min-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
      justify-content: flex-end;
    // justify-content: space-between;
  }
`;

const FooterActionsWrapper = styled(Grid)`
  && {
    display: flex;
    align-items: center;
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.creators.colors.gray2};
    }
  }
`;
const ProjectImg = styled.img`
  width: 100%;
`;
const ShowMore = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 1.1rem/100% normal;
  font-family: unset;
  @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
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
    div {
      background-color: white;
    }

    .carousel-root {
      div.thumbs-wrapper {
        margin: 12px;
      }
      p.carousel-status {
        display: none;
      }
      ul.control-dots {
        display: none;
      }
      ul.thumbs {
        padding: 0;
        margin: 0;
        li.thumb {
          height: 48px;
          width: 48px !important;
          margin-right: 0.5rem;
          img {
            width: 100% !important;
            height: 100%;
          }
        }
      }
      img.carousel-img {
        max-height: none;
      }
    }
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsContent}) {
      text-align: center;
    }
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
      img.carousel-img {
        max-height: 300px;
      }
      
    }
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsMobile}) {
      img.carousel-img {
        max-height: 235px;
      }
      & > div {
        height: auto !important;
      }
    }
    
    
    @media only screen and (max-width: ${({ theme }) =>
    theme.creators.breakpoints.creatorsTablet}) {
      margin-bottom: 1.5rem;
    }
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  padding: 37.5%;
  height: 0;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
  }
`;

const VideoPlayer = styled(ReactPlayer)`
  position: relative;
  padding: 37.5%;
  height: 0;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
  }
`;

const OuterLinkList = styled.div`
  margin-bottom: 10px;
`;
function Project({
  project,
  showMore = false,
  clickShowMore = null,
  toggleJoin,
  user,
}) {
  const [touch, setTouch] = useState(false);

  if (showMore) {
    return (
      <ProjectWrapper className="text-center show-more">
        <ShowMore onClick={clickShowMore}>Show More</ShowMore>
      </ProjectWrapper>
    );
  }
  const onClickHelp = () => {
    if (user) {
      setTouch(true);
    } else {
      toggleJoin(true);
    }
  };
  return (
    <ProjectWrapper>
      <ProjectBodyWrapper container>
        <ProjectContent item xs={12} lg={7}>
          <Title>{project.title}</Title>
          <ProjectProposal
            project={project}
            open={touch}
            handleClose={() => setTouch(false)}
          />
          {/* <Topics>
            {project.topics &&
              project.topics.map((topic, index) => (
                <Topic key={index}>{topic}</Topic>
              ))}
          </Topics> */}
          <Summary>{project.summary}</Summary>
          <OuterLinkList>
            {project.links &&
              project.links.map((link, index) => {
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
          </OuterLinkList>
        </ProjectContent>
        <ProjectImageWrapper item xs={12} lg={5}>
          {project.images.length === 0 && project.video && (
            <VideoPlayer url={project.video} playing={false} width="" height="" />
          )}
          {project.images.length === 1 && (
            // <ImageWrapper>
              <ProjectImg src={`https:${project.images[0]}`} alt="project img" />
            // </ImageWrapper>
          )}
          {project.images.length > 1 && (
            <Carousel>
              {project.images.map(image => (
                <ImageWrapper>
                  <img
                    src={`https:${image}`}
                    alt="project img"
                    className="carousel-img"
                  />
                </ImageWrapper>
              ))}
            </Carousel>
          )}
        </ProjectImageWrapper>
      </ProjectBodyWrapper>
      <ProjectFooter container>
        <CollaboratorContainer item xs={12} md={7} lg={7}>
          <Collaborators project={project} />
        </CollaboratorContainer>
        <FooterActionsWrapper item xs={12} md={5} lg={5}>
          <FooterActions>
            {/* <FooterAction className="favorite">
              <FooterActionIcon>
                {' '}
                <Favorite />{' '}
              </FooterActionIcon>
              102
            </FooterAction> */}
            <FooterAction onClick={onClickHelp}>
              {/* onClick={() => setTouch(true)} */}
              <FooterActionIcon>
                {' '}
                <Mail />{' '}
              </FooterActionIcon>
              I want to help
            </FooterAction>
            {/* <FooterAction>
              <FooterActionIcon>
                {' '}
                <Share />{' '}
              </FooterActionIcon>
              Share
            </FooterAction> */}
          </FooterActions>
        </FooterActionsWrapper>
      </ProjectFooter>
    </ProjectWrapper>
  );
}

Project.propTypes = {
  showMore: PropTypes.bool,
  projects: PropTypes.array,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleJoin: PropTypes.func
};

export default Project;
