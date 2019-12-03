import React from 'react';

import { stringify } from 'svgson';
import { connect } from 'react-redux';

const download = (svg, obj) => {
  svg.children = obj;

  var text = stringify(svg);
  var data = new Blob([text], { type: 'image/svg+xml' });
  var url = window.URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'newSvg.svg');

  document.body.appendChild(link);
  link.click();
};

const SVGExport = ({ svg, obj }) => (
  <button onClick={() => download(svg, obj)}>Export</button>
);

let mapStateToProps = ({ svgcanvas }) => ({
  svg: svgcanvas.svg,
  obj: svgcanvas.obj[svgcanvas.currentStep],
});

const mapFunction = {};

export default connect(mapStateToProps, mapFunction)(SVGExport);
