import React from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './containers/Header';

import UpperPartContainer from './containers/UpperPartContainer';
import MainPartContainer from './containers/MainPartContainer';
import FootterPartContainer from './containers/FootterPartContainer';

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

function App() {
  return (
    <div className="App">
      <ParentDiv>
        <Header />
        <UpperPartContainer />
        <MainPartContainer />
        <FootterPartContainer />
      </ParentDiv>
    </div>
  );
}

export default App;
