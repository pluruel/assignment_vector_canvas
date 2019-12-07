import React from 'react';

import { stringify } from 'svgson';
import { connect } from 'react-redux';

// export 직전에 viewBox를 초기화 해 주는 부분
const createStringFromAttrivutes = attributes => {
  let nextViewBox = '';

  nextViewBox += 0 + ' ';
  nextViewBox += 0 + ' ';
  nextViewBox += attributes.width + ' ';
  nextViewBox += attributes.height + ' ';

  return nextViewBox;
};

const downloadModule = (svg, obj) => {
  svg.children = obj;

  // 옮겨진 부분을 초기화 하는 부분.
  // view 시작 위치를 잡아준다.
  var text = stringify({
    ...svg,
    attributes: {
      ...svg.attributes,
      viewBox: createStringFromAttrivutes(svg.attributes),
    },
  });
  var data = new Blob([text], { type: 'image/svg+xml' });
  var url = window.URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'newSvg.svg');

  document.body.appendChild(link);
  link.click();
};

const SVGExport = ({ svg, obj }) => (
  <button onClick={() => downloadModule(svg, obj)}>Export</button>
);

let mapStateToProps = ({ svgcanvas }) => ({
  svg: svgcanvas.svg,
  obj: svgcanvas.obj[svgcanvas.currentStep],
});

const mapFunction = {};

export default connect(mapStateToProps, mapFunction)(SVGExport);
