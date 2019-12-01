import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectColor } from '../modules/svgcanvas';
const colors = ['#0000ff', '#ff0000', '#00ff00', '#000000', '#ffffff'];

const ColorDiv = styled.div`
  border: solid 1px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;

  padding: 2px;

  width: 25px;
`;

const ColorContainer = styled.div`
  height: 39px;
  width: 39px;
`;

const SelectorDiv = styled.div`
  height: 450px;
  margin-top: 4px;
`;

const ColorSelector = ({ selectedColor, selectColor }) => (
  <SelectorDiv>
    {colors.map((e, idx) => (
      <ColorContainer>
        <ColorDiv
          key={idx}
          style={{
            backgroundColor: e,
            border:
              selectedColor === e ? 'solid black 2.5px ' : 'solid black 1px ',
          }}
          onClick={() => selectColor(e)}
        />
      </ColorContainer>
    ))}
  </SelectorDiv>
);

let mapStateToProps = ({ svgcanvas }) => ({
  selectedColor: svgcanvas.selectedColor,
});

const mapFunction = {
  selectColor,
};

export default connect(mapStateToProps, mapFunction)(ColorSelector);
