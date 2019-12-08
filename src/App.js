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
import Zoom from './containers/Zoom';

const MainDiv = styled.div`
  display: flex;
`;
const UpperPart = styled.div`
  display: flex;
`;
const LowerPart = styled.div`
  display: flex;
`;

const ParentDiv = styled.div`
  background-color: white;
  border-radius: 2px;
  bottom: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 1.125);
  height: 600px;
  left: 0;
  margin: auto;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 720px;
`;

function App({ undo, redo, objLength, currentStep }) {
  return (
    <div className="App">
      <ParentDiv>
        <Header />
        <UpperPart>
          <Zoom />
          <div style={{ marginLeft: 'auto' }} />

          <SizeSetter />
          <MdUndo
            onClick={() => {
              return currentStep > 0 ? undo() : null;
            }}
          />
          <MdRedo
            onClick={() => {
              return currentStep < objLength - 1 ? redo() : null;
            }}
          />
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
      </ParentDiv>
    </div>
  );
}

const mapStateToProps = ({ svgcanvas }) => ({
  objLength: svgcanvas.obj.length,
  currentStep: svgcanvas.currentStep,
});

const mapFunction = {
  undo,
  redo,
};

export default connect(mapStateToProps, mapFunction)(App);
