export const parseViewBox = viewBoxString => {
  let values = viewBoxString.split(' ').filter(Boolean); // filter removes empty strings
  return values.map(Number);
};

// const zoomIn = (viewBox) {

// }

const posValsToViewBoxStr = values => {
  let nextViewBox = '';
  values.forEach(element => {
    nextViewBox += element + ' ';
  });
  return nextViewBox;
};

export const move = ({ x1, y1, x2, y2, viewBox }) => {
  const diffx = x2 - x1;
  const diffy = y2 - y1;

  let values = parseViewBox(viewBox);

  values[0] = values[0] - diffx;
  values[1] = values[1] - diffy;

  return posValsToViewBoxStr(values);
};

export const revisePosition = viewBox => {
  const values = parseViewBox(viewBox);
  const obj = {
    xdiff: values[0],
    ydiff: values[1],
  };
  return obj;
};

export const zoomin = ({ x, y, viewBox }) => {
  let values = parseViewBox(viewBox);
  values[0] = (x + values[0]) / 2;
  values[1] = (y + values[1]) / 2;
  values[2] = values[2] / 2;
  values[3] = values[3] / 2;

  return posValsToViewBoxStr(values);
};

export const zoomout = ({ x, y, viewBox }) => {
  let values = parseViewBox(viewBox);
  values[0] = x - values[2];
  values[1] = y - values[3];
  values[2] = values[2] * 2;
  values[3] = values[3] * 2;

  return posValsToViewBoxStr(values);
};
