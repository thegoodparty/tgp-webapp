/**
 *
 * CampaignColorPicker
 *
 */

import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImBlocked } from 'react-icons/im';

import { PortalCampaignManagerPageContext } from '/containers/candidate-portal/PortalCampaignManagerPage';
import Row from '../../shared/Row';

const Wrapper = styled.div`
  margin-bottom: 12px;

  .slick-arrow::before {
    color: #fff;
    opacity: 1;
    box-shadow: 0 0 10px #000;
    border-radius: 50%;
  }

  .slick-next {
    right: 10px;
  }
  .slick-prev {
    left: 10px;
    z-index: 10;
  }
`;

const ColorWrapper = styled.div`
  padding-right: 5px;
`;

const Color = styled.div`
  height: 145px;
  position: relative;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disabled {
    cursor: not-allowed;
  }
`;

const Label = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 11px;
  left: 0;
  bottom: 12px;
`;

const Party = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 11px;
  left: 0;
  top: 16px;
  font-weight: 900;
`;

const Wrong = styled.div`
  text-align: center;
  font-size: 11px;
  left: 0;
  top: 16px;
`;

const Selected = styled.div`
  display: inline-block;
  width: 60%;
  margin-left: 20%;
  height: 6px;
  border-radius: 6px;
  margin-top: 8px;
`;

const Group = styled.div`
  margin-right: 28px;
  color: #636363;
  margin-bottom: 25px;
  cursor: pointer;

  &.active {
    font-weight: 900;
    color: #000;
    text-decoration: underline;
  }
`;

const bright = ['#FEBE36', '#FA5820', '#FE0F6E', '#8239E6', '#3A86FA'];
const muted = ['#EE496F', '#FFD171', '#19D5A2', '#168AB0', '#083B4B'];
const pastel = [
  '#FD6E75',
  '#02055B',
  '#4995EB',
  '#093D74',
  '#ED9654',
  '#F8593F',
  '#62BB47',
  '#3600FF',
  '#3D3488',
  '#562C2D',
  '#159593',
  '#167474',
  '#B41B9B',
  '#710DB2',
  '#550EA9',
];

const political = [
  { color: '#E5C601', party: 'Libertarian' },
  { color: '#00A95C', party: 'Green' },
  { color: '#D71F28', party: 'Republican', wrong: true },
  { color: '#0044C9', party: 'Democrat', wrong: true },
];

const colors = [];
bright.forEach((color) => {
  colors.push({ color, type: 'bright' });
});
muted.forEach((color) => {
  colors.push({ color, type: 'muted' });
});
pastel.forEach((color) => {
  colors.push({ color, type: 'pastel' });
});
political.forEach((color) => {
  colors.push({ ...color, type: 'political' });
});

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 10,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const groups = [
  { name: 'Bright', slide: 0 },
  { name: 'Muted', slide: bright.length },
  { name: 'Pastel', slide: bright.length + muted.length },
  { name: 'Political', slide: bright.length + muted.length + pastel.length },
];

function CampaignColorPicker() {
  const { candidate, updateCandidateCallback } = useContext(
    PortalCampaignManagerPageContext,
  );
  const slider = useRef(null);
  const [selected, setSelected] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  useEffect(() => {
    if (candidate?.color) {
      setSelected(candidate.color);
    }
  }, [candidate]);

  const selectColor = (color) => {
    if (color.wrong) {
      return;
    }
    setSelected(color);
    updateCandidateCallback(candidate.id, {
      ...candidate,
      color,
    });
  };

  const slideToGroup = (group) => {
    slider.current?.slickGoTo(group.slide);
  };

  settings.afterChange = (current) => {
    if (current >= groups[3].slide) {
      setSelectedGroup(groups[3]);
      return;
    }
    if (current >= groups[2].slide) {
      setSelectedGroup(groups[2]);
      return;
    }
    if (current >= groups[1].slide) {
      setSelectedGroup(groups[1]);
      return;
    }
    setSelectedGroup(groups[0]);
  };
  return (
    <Wrapper>
      <Row>
        <Group style={{ marginRight: '44px' }}>Campaign Colors</Group>
        {groups.map((group) => (
          <Group
            key={group.name}
            className={group.name === selectedGroup.name && 'active'}
            onClick={() => {
              slideToGroup(group);
            }}
          >
            {group.name}
          </Group>
        ))}
      </Row>
      <Slider {...settings} ref={slider}>
        {colors.map((color) => (
          <ColorWrapper key={color.color}>
            <Color
              style={{ backgroundColor: color.color }}
              onClick={() => selectColor(color)}
              className={color.wrong && 'disabled'}
            >
              {color.type === 'political' && <Party>{color.party}</Party>}
              {color.wrong && (
                <Wrong>
                  <ImBlocked size={36} />

                  <div style={{ marginTop: '6px' }}>Wrong Site</div>
                </Wrong>
              )}
              <Label>{color.color}</Label>
            </Color>
            <Selected
              style={
                color.color === selected.color
                  ? { backgroundColor: color.color }
                  : {}
              }
            />
          </ColorWrapper>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default CampaignColorPicker;
