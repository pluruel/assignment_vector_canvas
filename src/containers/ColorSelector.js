import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectColor, openColourSelector } from '../modules/svgcanvas';
import { PhotoshopPicker } from 'react-color';
import ColourPicker from './ColourPicker';
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

const ColorSelector = ({
  selectedColor,
  pickerOpened,
  selectColor,
  openColourSelector,
}) => {
  return (
    <SelectorDiv>
      {colors.map(e => (
        <ColorContainer key={e}>
          <ColorDiv
            key={e}
            style={{
              backgroundColor: e,
              border:
                selectedColor === e ? 'solid black 2.5px ' : 'solid black 1px ',
            }}
            onClick={() => selectColor(e)}
          />
        </ColorContainer>
      ))}
      <ColorContainer key="selector">
        <ColorDiv
          key={'selector'}
          style={{
            backgroundColor: selectedColor,
            border:
              selectedColor === 'selector'
                ? 'solid black 2.5px '
                : 'solid black 1px ',
          }}
          onClick={() => openColourSelector()}
        />
      </ColorContainer>
      {pickerOpened ? <ColourPicker /> : null}
    </SelectorDiv>
  );
};

let mapStateToProps = ({ svgcanvas }) => ({
  selectedColor: svgcanvas.selectedColor,
  pickerOpened: svgcanvas.pickerOpened,
});

const mapFunction = {
  selectColor,
  openColourSelector,
};

export default connect(mapStateToProps, mapFunction)(ColorSelector);
