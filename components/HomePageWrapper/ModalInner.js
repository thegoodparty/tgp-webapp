import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BlackButton from '../shared/buttons/BlackButton';

const Wrapper = styled.div`
  padding: 36px;
  background-color: #fff;
  border-radius: 4px;
  width: 50%;
  max-width: 600px;
  min-width: 300px;
  font-size: 24px;
`;

const ModalInner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;

    document.body.appendChild(script);
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '21589597',
          formId: '39b42d7f-826d-435d-a41f-bd692ee1298e',
          target: '#hubspotFormModal',
        });
      }
    });
  }, []);
  return (
    <Wrapper>
      <strong>#goodparty Tuesdays are coming soon...</strong>
      <br />
      <br />
      Sign up to be the first to know! ❤️ 🎉

      <br />
      <br />
      <div id="hubspotFormModal" />
    </Wrapper>
  );
};

export default ModalInner;
