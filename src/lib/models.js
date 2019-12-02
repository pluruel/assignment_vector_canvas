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
export const createEllipse = ({ x, y, fill }) => {
  const obj = {
    name: 'ellipse',
    type: 'element',
    value: '',
    attributes: {
      cx: x,
      cy: y,
      fill: fill,
    },
    children: [],
  };

  return obj;
};

export const createTempEllipse = ({ x1, y1, x2, y2 }) => {
  let cx, cy, rx, ry;

  if (x2 < x1) {
    cx = (x1 + x2) / 2;
    rx = (x1 - x2) / 2;
  } else {
    cx = (x2 + x1) / 2;
    rx = (x2 - x1) / 2;
  }
  if (y2 < y1) {
    cy = (y1 + y2) / 2;
    ry = (y1 - y2) / 2;
  } else {
    cy = (y2 + y1) / 2;
    ry = (y2 - y1) / 2;
  }
  const temp = {};

  temp['rx'] = rx;
  temp['ry'] = ry;
  temp['cx'] = cx;
  temp['cy'] = cy;

  return temp;
};
