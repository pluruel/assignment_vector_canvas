import React from 'react';

import { connect } from 'react-redux';
import { selectTool, imports } from '../modules/svgcanvas';
import { parse, stringify } from 'svgson';
const uploadFile = (event, objidx, imports) => {
  let file = event.target.files[0];
  const fr = new FileReader();
  let cnt = objidx;
  fr.onload = () => {
    parse(fr.result).then(e =>
      imports({
        objs: e.children.map(c => ({
          ...c,
          id: cnt++,
        })),
        objidx: cnt,
      }),
    );
  };

  fr.readAsText(file);
};

const SVGImport = ({ selectedTool, selectTool, objidx, imports }) => (
  <input type="file" onChange={e => uploadFile(e, objidx, imports)} />
);

let mapStateToProps = ({ svgcanvas }) => ({
  selectedTool: svgcanvas.selectedTool,
  objidx: svgcanvas.objidx,
});

const mapFunction = {
  selectTool,
  imports,
};

export default connect(mapStateToProps, mapFunction)(SVGImport);
