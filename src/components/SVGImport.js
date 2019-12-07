import React from 'react';

import { connect } from 'react-redux';
import { imports, setZoomRatio } from '../modules/svgcanvas';
import { parse } from 'svgson';
import { parseViewBox } from '../lib/functions';

const uploadFile = (event, objidx, imports, setZoomRatio) => {
  let file = event.target.files[0];
  const fr = new FileReader();
  let cnt = objidx;

  fr.onload = () => {
    parse(fr.result).then(e => {
      if (e.attributes.viewBox) {
        const [x, y, width, height] = parseViewBox(e.attributes.viewBox, true);
        e.attributes['x'] = x;
        e.attributes['y'] = y;
        e.attributes['width'] = width;
        e.attributes['height'] = height;
      }
      imports({
        svg: e,
        objs: e.children.map(c => ({
          ...c,
          id: cnt++,
        })),
        objidx: cnt,
      });
      setZoomRatio(1);
    });
  };

  fr.readAsText(file);
};

const SVGImport = ({ objidx, imports, setZoomRatio }) => (
  <input
    type="file"
    onChange={e => uploadFile(e, objidx, imports, setZoomRatio)}
  />
);

const mapStateToProps = ({ svgcanvas }) => ({
  selectedTool: svgcanvas.selectedTool,
  objidx: svgcanvas.objidx,
});

const mapFunction = {
  imports,
  setZoomRatio,
};

export default connect(mapStateToProps, mapFunction)(SVGImport);
