import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SELECT_COLOR = 'svgcanvas/SELECT_COLOR';
const SELECT_TOOL = 'svgcanvas/SELECT_TOOL';
const SELECT_SIZE = 'svgcanvas/SELECT_SIZE';

export const selectColor = createAction(SELECT_COLOR);
export const selectTool = createAction(SELECT_TOOL);
export const selectSize = createAction(SELECT_SIZE);

const initialState = {
  selectedColor: '#000000',
  selectedTool: 'R',
  selectedSize: '5',
  obj: {
    name: 'svg',
    type: 'element',
    value: '',
    attributes: {},
    children: [
      {
        name: 'line',
        type: 'element',
        value: '',
        attributes: {
          stroke: '#000000',
          'stroke-width': '1',
          x1: '100',
          y1: '80',
          x2: '250',
          y2: '150',
        },
        children: [],
      },
      {
        name: 'line',
        type: 'element',
        value: '',
        attributes: {
          stroke: '#000000',
          'stroke-width': '1',
          x1: '70',
          y1: '80',
          x2: '250',
          y2: '150',
        },
        children: [],
      },
    ],
  },
};

const svgcanvas = handleActions(
  {
    [SELECT_COLOR]: (state, action) => ({
      ...state,
      selectedColor: action.payload,
    }),
    [SELECT_TOOL]: (state, action) => ({
      ...state,
      selectedTool: action.payload,
    }),
    [SELECT_SIZE]: (state, action) => ({
      ...state,
      selectedSize: action.payload.target.value,
    }),
  },
  initialState,
);

export default svgcanvas;
