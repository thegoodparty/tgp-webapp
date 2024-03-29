import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaTwitter,
  FaRetweet,
  FaHeart,
  FaFacebookF,
  FaInstagram,
  FaRedditAlien,
  FaCommentAlt,
  FaTiktok,
} from 'react-icons/fa';

import { dateUsHelper } from '../../helpers/dateHelper';
import BlackButton, { InnerButton } from './buttons/BlackButton';
import ShareModal from './ShareModal';

const Post = styled.div`
  padding: 28px 15px 70px;
  background-color: #fff;
  text-align: left;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 5px 5px #f2f2f2;
  transition: background-color 0.4s;
  &:hover {
    background-color: #efefef;
  }

  video {
    width: 100%;
    height: auto;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 24px;
  right: 15px;
  font-size: 26px;
  color: #33ccff;

  &.REDDIT {
    color: #ff4500;
  }

  &.FACEBOOK,
  &.FACEBOOK_PUBLIC {
    color: #4267b2;
  }

  &.INSTAGRAM {
    color: #833ab4;
  }

  &.ONLINE_NEWS {
    display: none;
  }

  &.TIKTOK {
    color: #ff0050;
  }
`;
const TitlePadder = styled.div`
  padding-right: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-weight: 900;
  text-decoration: underline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Handle = styled.div`
  color: #d3d3d3;
  margin-left: 10px;
  font-weight: 900;
`;

const Date = styled.div`
  font-size: 14px;
  margin-bottom: 18px;
`;

const Content = styled.div`
  margin-bottom: 18px;
`;

const ImgWrapper = styled.div`
  position: relative;
  min-height: 250px;
  span {
    position: static !important;
    min-height: 250px;
  }
  img {
    width: 100%;
    height: 250px !important;
    position: static !important;
  }
`;

const Img = styled(Image)`
  width: 100%;
  height: auto;
  margin-bottom: 12px;
`;

const Bottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Retweet = styled.div`
  display: inline-flex;
  font-size: 14px;
  margin-right: 14px;
  span {
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    margin-left: 4px;
  }
`;

const imgLoader = ({ src }) => src;

const SocialPost = ({ post }) => {
  const [hasImage, setHasImage] = useState(
    post && post.images && post.images.length > 0,
  );
  const [showShare, setShowShare] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const hasVideo = post.video && post.video.src;

  useEffect(() => {
    let show = true;
    if (
      source === 'FACEBOOK' ||
      source === 'FACEBOOK_PUBLIC' ||
      source === 'INSTAGRAM'
    ) {
      if (hasImage) {
        show = false;
      }
    }
    if (source === 'TIKTOK' && hasVideo) {
      show = false;
    }
    setShowContent(show);
  }, [hasImage]);

  if (!post || !post.content) {
    return <></>;
  }

  const {
    title,
    userName,
    userScreenName,
    images,
    publishedAt,
    content,
    url,
    likesCount,
    source,
    commentsCount,
  } = post;

  const shortContent = content.substring(0, 140);

  let contentWithLinks = shortContent.replace(
    /\bhttps?:\/\/\S+/gi,
    '<a href="$&" target="_blank" rel="noopener noreferrer nofollow">$&</a>',
  );

  if (content.length > 140) {
    contentWithLinks += '...';
  }

  let icon = <FaTwitter />;
  if (source === 'INSTAGRAM') {
    icon = <FaInstagram />;
  } else if (source === 'TIKTOK') {
    icon = <FaTiktok />;
  } else if (source === 'REDDIT') {
    icon = <FaRedditAlien />;
  } else if (source === 'FACEBOOK' || source === 'FACEBOOK_PUBLIC') {
    icon = <FaFacebookF />;
  }

  const handleError = () => {
    setHasImage(false);
  };

  const WrapperElement = ({ children }) => {
    if (hasVideo) {
      return <div>{children}</div>;
    } else {
      return (
        <a
          className="no-underline feed-post"
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          id={`feed-post-${url}`}
        >
          {children}
        </a>
      );
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShare(true);
  };

  return (
    <WrapperElement>
      <Post className="break-word" data-cy="post-item">
        <Icon className={source}>{icon}</Icon>
        <TitlePadder>
          {title && (
            <UserName style={{ marginBottom: '14px' }} data-cy="post-title">
              {title}
            </UserName>
          )}
          {(userName || userScreenName) && (
            <div>
              <Title>
                {userName && (
                  <UserName
                    data-cy="post-username"
                    style={title ? { textDecoration: 'none' } : {}}
                  >
                    {userName}
                  </UserName>
                )}
                {userScreenName && (
                  <Handle data-cy="post-screenname">@{userScreenName}</Handle>
                )}
              </Title>
            </div>
          )}
        </TitlePadder>
        {publishedAt && (
          <Date data-cy="post-published-at">{dateUsHelper(publishedAt)}</Date>
        )}
        {showContent && (
          <Content dangerouslySetInnerHTML={{ __html: contentWithLinks }} />
        )}

        <Bottom>
          <div>
            {likesCount !== null && (
              <Retweet>
                <div>
                  <FaHeart />
                </div>
                <span data-cy="post-likes">{likesCount}</span>
              </Retweet>
            )}

            {commentsCount !== null && (
              <Retweet>
                <div>
                  <FaCommentAlt />
                </div>
                <span data-cy="post-comments">{commentsCount}</span>
              </Retweet>
            )}
          </div>
          <div>
            <BlackButton
              style={{ textTransform: 'none', padding: '4px 12px' }}
              onClick={handleClick}
              id={`feed-post-share-${url}`}
              className="feed-post-share"
            >
              <InnerButton>Share</InnerButton>
            </BlackButton>
          </div>
        </Bottom>
        {hasImage && (
          // <img
          //   src={images[0].url}
          //   onError={handleError}
          //   alt={title || `${source} social post`}
          //   // width={imageSize.width}
          //   // height={imageSize.height}
          //   className="full-image"
          // />
          <ImgWrapper>
            <Img
              src={images[0].url}
              onError={handleError}
              alt={title || `${source} social post`}
              layout="fill"
              loader={imgLoader}
              objectFit="contain"
              height={250}
            />
          </ImgWrapper>
        )}
        {hasVideo && (
          <div>
            <video
              src={post.video.src}
              poster={post.video.poster}
              controls
              preload="none"
            />
            <br />
            <br />
            <a
              className="feed-post"
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              id={`feed-post-${url}`}
              data-cy="post-view-tiktok"
            >
              View on TikTok
            </a>
          </div>
        )}
      </Post>
      {showShare && (
        <ShareModal shareUrl={url} closeCallback={() => setShowShare(false)} />
      )}
    </WrapperElement>
  );
};

export default SocialPost;
