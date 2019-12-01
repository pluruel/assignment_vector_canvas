import React from 'react';

import { connect } from 'react-redux';
import { selectSize } from '../modules/svgcanvas';

const SizeSetter = ({ selectedSize, selectSize }) => {
  return (
    <div style={{ display: 'flex' }}>
      {selectedSize}
      <input
        type="range"
        min="1"
        max="1000"
        step="1"
        value={selectedSize}
        onChange={selectSize}
      />
    </div>
  );
};
let mapStateToProps = ({ svgcanvas }) => ({
  selectedSize: svgcanvas.selectedSize,
});

const mapFunction = {
  selectSize,
};

export default connect(mapStateToProps, mapFunction)(SizeSetter);
