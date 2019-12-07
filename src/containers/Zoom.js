import React from 'react';
import { connect } from 'react-redux';
import { selectColor } from '../modules/svgcanvas';

const Zoom = ({ zoomRatio }) => {
  return <div style={{ marginLeft: '90px' }}>x {zoomRatio}</div>;
};

const mapStateToProps = ({ svgcanvas }) => ({
  zoomRatio: svgcanvas.zoomRatio,
});

const mapFunction = {
  selectColor,
};

export default connect(mapStateToProps, mapFunction)(Zoom);
