import React from 'react';
import './App.css';
import DrawCanvas from './components/DrawCanvas';
import Editor from './components/Editor';
import SVGCanvas from './components/SVGCanvas';
import ColorSelector from './containers/ColorSelector';
import styled from 'styled-components';
import ToolSelector from './containers/ToolSelector';

const MainDiv = styled.div`
  display: flex;
`;

function App() {
  return (
    <div className="App">
      <MainDiv>
        <ToolSelector />
        <ColorSelector />
        <SVGCanvas />
      </MainDiv>
    </div>
  );
}

export default App;
