import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
const colors = ['#0000ff', '#ff0000', '#00ff00', '#000000', '#ffffff'];

const Div = styled.div`
  border: solid 1px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
  width: 25px;
`;

const SelectorDiv = styled.div`
  height: 450px;
  width: 28px;
`;

const ColorSelector = () => {
  return (
    <SelectorDiv>
      {colors.map((e, idx) => {
        console.log(idx);
        return <Div key={idx} style={{ backgroundColor: e }} />;
      })}
    </SelectorDiv>
  );
};

let mapStateToProps = ({ svgcanvas }) => ({
  objs: svgcanvas.objs,
});

export default connect(mapStateToProps)(ColorSelector);
