export const parseViewBox = (viewBoxString, asNumbers = false) => {
  let values = viewBoxString.split(/[ ,]/).filter(Boolean); // filter removes empty strings

  return asNumbers ? values.map(Number) : values;
};
