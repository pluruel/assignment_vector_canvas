import React from 'react';

import { connect } from 'react-redux';
import { selectTool, imports } from '../modules/svgcanvas';
import { parse, stringify } from 'svgson';
const uploadFile = (event, imports) => {
  let file = event.target.files[0];

  const fr = new FileReader();

  fr.onload = () => {
    parse(fr.result).then(e => imports(e.children));
  };
};

const SVGImport = ({ selectedTool, selectTool, imports }) => (
  <input type="file" onChange={e => uploadFile(e, imports)} />
);

let mapStateToProps = ({ svgcanvas }) => ({
  selectedTool: svgcanvas.selectedTool,
});

const mapFunction = {
  selectTool,
  imports,
};

export default connect(mapStateToProps, mapFunction)(SVGImport);
