/**
 *
 * ApplicationStep1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ApplicationWrapper from '../ApplicationWrapper';

const Title = styled.h1`
  font-size: 21px;
  margin: 0 0 16px;
  @media only screen and (min-width: ${({ theme }) =>
  theme.breakpointsPixels.md}) {
  font-size: 36px;
  }
`;

function ApplicationStep1({ step }) {
  return (
    <ApplicationWrapper step={step}>
      <Title>
        Take the Good Party Pledge to get started{' '}
        <span role="img" aria-label="victory">
          ✌
        </span>
        ️
      </Title>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Cras ornare arcu dui
      vivamus arcu felis bibendum. Dui accumsan sit amet nulla facilisi. Viverra
      nibh cras pulvinar mattis nunc sed blandit libero. Molestie a iaculis at
      erat. Sagittis purus sit amet volutpat consequat mauris nunc. Egestas
      purus viverra accumsan in nisl nisi scelerisque. Orci a scelerisque purus
      semper eget duis at tellus at. Mi proin sed libero enim. Viverra
      adipiscing at in tellus. Massa enim nec dui nunc. Viverra aliquet eget sit
      amet. Vitae semper quis lectus nulla at.
      <br />
      <br />
      Nec nam aliquam sem et tortor consequat id. Etiam tempor orci eu lobortis
      elementum nibh tellus. Vitae tortor condimentum lacinia quis vel.
      Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Pulvinar
      pellentesque habitant morbi tristique senectus. Rhoncus aenean vel elit
      scelerisque mauris pellentesque pulvinar. Tincidunt arcu non sodales neque
      sodales ut etiam. Donec massa sapien faucibus et. Nulla posuere
      sollicitudin aliquam ultrices. Enim ut sem viverra aliquet eget sit amet
      tellus. Vitae semper quis lectus nulla. At risus viverra adipiscing at in
      tellus integer feugiat. Morbi tristique senectus et netus et malesuada
      fames.
      <br />
      <br />
      Nunc mi ipsum faucibus vitae aliquet. Consequat nisl vel pretium lectus
      quam id leo in vitae. Aenean et tortor at risus viverra adipiscing at in.
      Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.
      Condimentum id venenatis a condimentum vitae sapien pellentesque habitant
      morbi. Semper feugiat nibh sed pulvinar. Ante in nibh mauris cursus
      mattis. Urna porttitor rhoncus dolor purus non enim. Venenatis cras sed
      felis eget velit aliquet sagittis. A diam maecenas sed enim. Adipiscing
      diam donec adipiscing tristique risus nec feugiat in fermentum. Imperdiet
      massa tincidunt nunc pulvinar sapien et. Ac turpis egestas maecenas
      pharetra. Orci dapibus ultrices in iaculis nunc. Mi in nulla posuere
      sollicitudin aliquam ultrices. Sed enim ut sem viverra. Enim lobortis
      scelerisque fermentum dui. Vitae congue mauris rhoncus aenean. Velit
      egestas dui id ornare arcu odio.
      <br />
      <br />
      Semper auctor neque vitae tempus quam. Ut venenatis tellus in metus
      vulputate. Ornare massa eget egestas purus. Nunc lobortis mattis aliquam
      faucibus purus in massa. Semper quis lectus nulla at volutpat diam. Ac
      orci phasellus egestas tellus rutrum tellus. Sagittis aliquam malesuada
      bibendum arcu vitae elementum curabitur vitae. Felis donec et odio
      pellentesque diam volutpat commodo sed. At erat pellentesque adipiscing
      commodo. Turpis egestas sed tempus urna et pharetra. Felis imperdiet proin
      fermentum leo vel orci porta non. Auctor neque vitae tempus quam
      pellentesque nec nam aliquam. Nibh tellus molestie nunc non blandit massa.
      Viverra aliquet eget sit amet tellus cras adipiscing enim eu. Feugiat in
      fermentum posuere urna nec tincidunt praesent. Magna fringilla urna
      porttitor rhoncus dolor purus non enim. Eu nisl nunc mi ipsum faucibus
      vitae aliquet.
      <br />
      <br />
      Pellentesque habitant morbi tristique senectus et netus et malesuada
      fames. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Id
      nibh tortor id aliquet lectus. Pretium nibh ipsum consequat nisl vel
      pretium. Nisi vitae suscipit tellus mauris a diam maecenas sed enim.
      Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.
      Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis.
      Nunc vel risus commodo viverra maecenas accumsan lacus. Suspendisse
      ultrices gravida dictum fusce ut. Bibendum at varius vel pharetra. Metus
      aliquam eleifend mi in nulla posuere sollicitudin aliquam. In iaculis nunc
      sed augue. Risus commodo viverra maecenas accumsan. Lacus vel facilisis
      volutpat est velit egestas. Ut sem nulla pharetra diam. Gravida arcu ac
      tortor dignissim convallis aenean. Erat pellentesque adipiscing commodo
      elit at. Tortor aliquam nulla facilisi cras. Faucibus vitae aliquet nec
      ullamcorper sit amet.
    </ApplicationWrapper>
  );
}

ApplicationStep1.propTypes = {
  step: PropTypes.number,
};

export default ApplicationStep1;
