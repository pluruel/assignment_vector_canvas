import React from 'react';
import './App.css';
import SVGCanvas from './components/SVGCanvas';
import ColorSelector from './containers/ColorSelector';
import styled from 'styled-components';
import ToolSelector from './containers/ToolSelector';
import Header from './containers/Header';
import SVGImport from './containers/SVGImport';
import { MdUndo, MdRedo } from 'react-icons/md';
import SizeSetter from './components/SizeSetter';

const MainDiv = styled.div`
  display: flex;
`;
const UpperPart = styled.div`
  display: flex;
`;
const LowerPart = styled.div`
  display: flex;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <UpperPart>
        <div style={{ marginLeft: 'auto' }} />
        <SizeSetter />
        <MdUndo />
        <MdRedo />
      </UpperPart>
      <MainDiv>
        <ToolSelector />
        <ColorSelector />
        <SVGCanvas />
      </MainDiv>
      <LowerPart>
        <div style={{ marginLeft: 'auto' }} />
        <SVGImport />
      </LowerPart>
    </div>
  );
}

export default App;
