import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectColor } from '../modules/svgcanvas';
const colors = ['#0000ff', '#ff0000', '#00ff00', '#000000', '#ffffff'];

const Div = styled.div`
  border: solid 1px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;

  padding: 2px;

  width: 25px;
`;

const Div2 = styled.div`
  height: 39px;
  width: 39px;
`;

const SelectorDiv = styled.div`
  height: 450px;
  margin-top: 4px;
`;

const ColorSelector = ({ selectedColor, selectColor }) => {
  return (
    <SelectorDiv>
      {colors.map((e, idx) => {
        return (
          <Div2>
            <Div
              key={idx}
              style={{
                backgroundColor: e,
                border:
                  selectedColor === e
                    ? 'solid black 2.5px '
                    : 'solid black 1px ',
              }}
              onClick={() => selectColor(e)}
            />
          </Div2>
        );
      })}
    </SelectorDiv>
  );
};

let mapStateToProps = ({ svgcanvas }) => ({
  selectedColor: svgcanvas.selectedColor,
});

const mapFunction = {
  selectColor,
};

export default connect(mapStateToProps, mapFunction)(ColorSelector);
