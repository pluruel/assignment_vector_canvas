export const createLine = ({ x1, y1, stroke, strokeWidth }) => {
  const obj = {
    name: 'line',
    type: 'element',
    value: '',
    attributes: {
      stroke: stroke,
      'stroke-width': strokeWidth,
      x1: x1,
      y1: y1,
      x2: x1,
      y2: y1,
    },
    children: [],
  };

  return obj;
};

export const createRect = ({ x, y, fill }) => {
  const obj = {
    name: 'rect',
    type: 'element',
    value: '',
    attributes: {
      x: x,
      y: y,
      fill: fill,
    },
    children: [],
  };

  return obj;
};

export const createTempRect = ({ x1, y1, x2, y2 }) => {
  let x, y, w, h;

  if (x2 < x1) {
    w = x1 - x2;
    x = x2;
  } else {
    w = x2 - x1;
    x = x1;
  }
  if (y2 < y1) {
    h = y1 - y2;
    y = y2;
  } else {
    h = y2 - y1;
    y = y1;
  }
  const temp = {};
  temp['width'] = w;
  temp['height'] = h;
  temp['x'] = x;
  temp['y'] = y;

  return temp;
};
