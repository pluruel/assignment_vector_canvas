import React from 'react';
import './App.css';
import DrawCanvas from './components/DrawCanvas';
import Editor from './components/Editor';
import SVGCanvas from './components/SVGCanvas';
import ColorSelector from './components/ColorSelector';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
`;

function App() {
  return (
    <div className="App">
      <MainDiv>
        <ColorSelector />
        <SVGCanvas />
      </MainDiv>
    </div>
  );
}

export default App;
