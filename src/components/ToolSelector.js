import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectTool } from '../modules/svgcanvas';
const shapes = [
  'line',
  'ellipse',
  'rect',
  'circle',
  'polygon',
  'polyline',
  'eraser',
  'zoomin',
  'zoomout',
  'mover',
];

const ToolDiv = styled.img`
  border: solid 1px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
  padding: 2px;
`;

const ToolContainer = styled.div`
  height: 39px;
  width: 38px;
`;

const SelectorDiv = styled.div`
  height: 450px;
  margin-top: 4px;
`;

const ToolSelector = ({ selectedTool, selectTool }) => (
  <SelectorDiv>
    {shapes.map((e, idx) => (
      <ToolContainer key={e}>
        <ToolDiv
          key={e}
          style={{
            border:
              selectedTool === e ? 'solid black 2.5px ' : 'solid black 1px ',
          }}
          onClick={() => selectTool(e)}
          src={require(`../icons/${e}.png`)}
        ></ToolDiv>
      </ToolContainer>
    ))}
  </SelectorDiv>
);

let mapStateToProps = ({ svgcanvas }) => ({
  selectedTool: svgcanvas.selectedTool,
});

const mapFunction = {
  selectTool,
};

export default connect(mapStateToProps, mapFunction)(ToolSelector);
