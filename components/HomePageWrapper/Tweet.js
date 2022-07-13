import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaTwitter, FaRetweet, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { dateUsHelper } from '../../helpers/dateHelper';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Post = styled.div`
  padding: 60px 15px 70px;
  background-color: #fff;
  text-align: left;
  position: relative;
  height: 100%;
`;

const Icon = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
  font-size: 26px;
  color: #33ccff;
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

const Img = styled.img`
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
  align-items: center;
  font-size: 18px;
  margin-right: 24px;
  span {
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    margin-left: 8px;
  }
`;

const Tweet = ({ tweet }) => {
  if (!tweet || !tweet.content) {
    return <></>;
  }

  const {
    userName,
    userScreenName,
    images,
    publishedAt,
    content,
    engagement,
    url,
    likesCount,
  } = tweet;
  const router = useRouter();
  const hasImage = images.length > 0;

  const contentWithLinks = content.replace(
    /\bhttps?:\/\/\S+/gi,
    '<a href="$&" target="_blank" rel="noopener noreferrer nofollow">$&</a>',
  );

  const handleShare = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // openShareModalCallback();
  };
  return (
    <a
      className="no-underline"
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      id={`feed-tweet-${url}`}
    >
      <Post>
        <Icon>
          <FaTwitter />
        </Icon>
        <Title>
          <UserName>{userName}</UserName>
          <Handle>@{userScreenName}</Handle>
        </Title>
        <Date>{dateUsHelper(publishedAt)}</Date>

        <Content dangerouslySetInnerHTML={{ __html: contentWithLinks }} />
        <Bottom>
          <div>
            <Retweet>
              <div>
                <FaHeart />
              </div>
              <span>{likesCount}</span>
            </Retweet>
            <Retweet>
              <div>
                <FaRetweet />
              </div>
              <span>{engagement}</span>
            </Retweet>
          </div>
          <div>
            <Link
              href={`${router.asPath}?share=true`}
              passHref
            >
              <a id={`feed-tweet-share-${url}`}>
                <BlackButton
                  style={{ textTransform: 'none', padding: '4px 12px' }}
                >
                  <InnerButton>Share</InnerButton>
                </BlackButton>
              </a>
            </Link>
          </div>
        </Bottom>
        {hasImage && <Img src={tweet.images[0].url} />}
      </Post>
    </a>
  );
};

export default Tweet;
