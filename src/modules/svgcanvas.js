import { handleActions, createAction } from 'redux-actions';

const SELECT_COLOR = 'svgcanvas/SELECT_COLOR';
const SELECT_TOOL = 'svgcanvas/SELECT_TOOL';
const SELECT_SIZE = 'svgcanvas/SELECT_SIZE';
const ADD_SHAPE = 'svgcanvas/ADD_SHAPE';
const UNDO = 'svgcanvas/UNDO';
const REDO = 'svgcanvas/REDO';
const REMOVE = 'svgcanvas/REMOVE';

export const selectColor = createAction(SELECT_COLOR);
export const selectTool = createAction(SELECT_TOOL);
export const selectSize = createAction(SELECT_SIZE);
export const remove = createAction(REMOVE);
export const addShape = createAction(ADD_SHAPE);
export const undo = createAction(UNDO);
export const redo = createAction(REDO);

const initialState = {
  selectedColor: '#000000',
  selectedTool: 'line',
  selectedSize: '5',
  svgdefault: {
    name: 'svg',
    type: 'element',
    value: '',
    attributes: {},
    children: [],
  },
  currentStep: 0,
  obj: [
    [
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
  ],
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
    [ADD_SHAPE]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      obj: {
        ...state.obj,
        [state.currentStep + 1]: [
          ...state.obj[state.currentStep],
          action.payload,
        ],
      },
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      obj: {
        ...state.obj,
        [state.currentStep + 1]: state.obj[state.currentStep].filter(
          e => action.payload !== e.key,
        ),
      },
    }),
    [UNDO]: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    [REDO]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
  },
  initialState,
);

export default svgcanvas;
