export const parseViewBox = viewBoxString => {
  let values = viewBoxString.split(' ').filter(Boolean); // filter removes empty strings
  return values.map(Number);
};

// const zoomIn = (viewBox) {

// }

export const move = ({ x1, y1, x2, y2, viewBox }) => {
  const diffx = x2 - x1;
  const diffy = y2 - y1;

  let values = parseViewBox(viewBox);

  values[0] = values[0] - diffx;
  values[1] = values[1] - diffy;

  let nextViewBox = '';

  values.forEach(element => {
    nextViewBox += element + ' ';
  });

  return nextViewBox;
};
