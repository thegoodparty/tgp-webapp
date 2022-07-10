import React from 'react';
import styled from 'styled-components';
import { dateUsHelper } from '../../helpers/dateHelper';
import { FaTwitter, FaRetweet, FaShare } from 'react-icons/fa';
import PinkButton from '../shared/buttons/PinkButton';

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
  display: flex;
  align-items: center;
  font-size: 18px;
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

  const { userName, userScreenName, images, publishedAt, content, engagement } =
    tweet;
  const hasImage = images.length > 0;

  const contentWithLinks = content.replace(
    /\bhttps?:\/\/\S+/gi,
    '<a href="$&" target="_blank" rel="nofollow">$&</a>',
  );
  return (
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
        <Retweet>
          <div>
            <FaRetweet />
          </div>
          <span>{engagement}</span>
        </Retweet>
        <div>
          <PinkButton style={{ textTransform: 'none', padding:'8px 12px' }}>
            Reshare &nbsp; <FaShare />
          </PinkButton>
        </div>
      </Bottom>
      {hasImage && <Img src={tweet.images[0].url} />}
    </Post>
  );
};

export default Tweet;
