import React from 'react';

import styled from 'styled-components';

import ToolSelector from '../components/ToolSelector';
import ColorSelector from '../components/ColorSelector';
import SVGCanvas from '../components/SVGCanvas';

const Div = styled.div`
  display: flex;
`;

const MainPartContainer = () => {
  return (
    <Div>
      <ToolSelector />
      <ColorSelector />
      <SVGCanvas />
    </Div>
  );
};

export default MainPartContainer;
