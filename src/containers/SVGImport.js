import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectTool } from '../modules/svgcanvas';

const SVGImport = ({ selectedTool, selectTool }) => <input type="file" />;

let mapStateToProps = ({ svgcanvas }) => ({
  selectedTool: svgcanvas.selectedTool,
});

const mapFunction = {
  selectTool,
};

export default connect(mapStateToProps, mapFunction)(SVGImport);
