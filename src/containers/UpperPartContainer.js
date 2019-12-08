import React from 'react';
import { MdUndo, MdRedo } from 'react-icons/md';
import styled from 'styled-components';
import { undo, redo } from '../modules/svgcanvas';
import { connect } from 'react-redux';
import Zoom from '../components/Zoom';
import SizeSetter from '../components/SizeSetter';

const UpperPart = styled.div`
  display: flex;
`;

const UpperPartContainer = ({ objLength, currentStep, undo, redo }) => {
  return (
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
  );
};

const mapStateToProps = ({ svgcanvas }) => ({
  objLength: svgcanvas.obj.length,
  currentStep: svgcanvas.currentStep,
});

const mapFunction = {
  undo,
  redo,
};

export default connect(mapStateToProps, mapFunction)(UpperPartContainer);
