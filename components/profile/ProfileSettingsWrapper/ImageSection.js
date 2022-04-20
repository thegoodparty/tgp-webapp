/**
 *
 * ImageSection
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ProfileSettingsPageContext } from '/containers/profile/ProfileSettingsPage';
import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import UserAvatar from '../../shared/UserAvatar';
import { InnerButton } from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  margin-bottom: 48px;
`;

const Change = styled.div`
  text-decoration: underline;
`;

function ImageSection() {
  const { user } = useContext(ProfileSettingsPageContext);
  const [uploadedImage, setUploadedImage] = useState(false);
  let updatedUser = uploadedImage ? { avatar: uploadedImage } : user;
  return (
    <section>
      <Wrapper>
        <UserAvatar user={updatedUser} size="large" />
        <br />
        <ImageUploadContainer
          customElement={<Change>Change Photo</Change>}
          isUserImage
          uploadCallback={(image) => setUploadedImage(image)}
          maxFileSize={1000000}
        />
      </Wrapper>
    </section>
  );
}

export default ImageSection;
