import React from 'react';
import './App.css';
import SVGCanvas from './components/SVGCanvas';
import ColorSelector from './containers/ColorSelector';
import styled from 'styled-components';
import ToolSelector from './containers/ToolSelector';
import Header from './containers/Header';

import { MdUndo, MdRedo } from 'react-icons/md';
import SizeSetter from './components/SizeSetter';
import { undo, redo } from './modules/svgcanvas';
import { connect } from 'react-redux';
import SVGImport from './components/SVGImport';
import SVGExport from './components/SVGExport';

const MainDiv = styled.div`
  display: flex;
`;
const UpperPart = styled.div`
  display: flex;
`;
const LowerPart = styled.div`
  display: flex;
`;

function App({ undo, redo }) {
  return (
    <div className="App">
      <Header />
      <UpperPart>
        <div style={{ marginLeft: 'auto' }} />
        <SizeSetter />
        <MdUndo onClick={() => undo()} />
        <MdRedo onClick={() => redo()} />
      </UpperPart>
      <MainDiv>
        <ToolSelector />
        <ColorSelector />
        <SVGCanvas />
      </MainDiv>
      <LowerPart>
        <div style={{ marginLeft: 'auto' }} />
        <SVGImport />
        <SVGExport />
      </LowerPart>
    </div>
  );
}

const mapFunction = {
  undo,
  redo,
};

export default connect(null, mapFunction)(App);
