import React from 'react';

export const getLine = ({ x1, x2, y1, y2, stroke, width }) => (
  <line x1={x1} x2={x2} y1={y1} y2={y2} stroke={stroke} stroke-width={width} />
);
