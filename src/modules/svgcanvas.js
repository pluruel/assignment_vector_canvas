import { handleActions, createAction } from 'redux-actions';

const SELECT_COLOR = 'svgcanvas/SELECT_COLOR';
const SELECT_TOOL = 'svgcanvas/SELECT_TOOL';
const SELECT_SIZE = 'svgcanvas/SELECT_SIZE';
const ADD_SHAPE = 'svgcanvas/ADD_SHAPE';
const UNDO = 'svgcanvas/UNDO';
const REDO = 'svgcanvas/REDO';
const REMOVE = 'svgcanvas/REMOVE';
const IMPORTS = 'svgcanvas/IMPORTS';
const EXPORTS = 'svgcanvas/EXPORTS';
const INITIALSTATE = 'svgcanvas/INITIALSTATE';

export const selectColor = createAction(SELECT_COLOR);
export const selectTool = createAction(SELECT_TOOL);
export const selectSize = createAction(SELECT_SIZE);
export const remove = createAction(REMOVE);
export const addShape = createAction(ADD_SHAPE);
export const undo = createAction(UNDO);
export const redo = createAction(REDO);
export const imports = createAction(IMPORTS);
export const exports = createAction(EXPORTS);
export const initialstate = createAction(INITIALSTATE);

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
  objidx: 0,
  currentStep: 0,
  obj: [[]],
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
      objidx: state.objidx + 1,
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      obj: {
        ...state.obj,
        [state.currentStep + 1]: state.obj[state.currentStep].filter(
          e => action.payload !== e.id,
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
    [INITIALSTATE]: (state, action) => ({
      state: initialState,
    }),
    [IMPORTS]: (state, action) => ({
      ...state,
      obj: {
        ...state.obj,
        [state.currentStep]: action.payload.objs,
      },
      objidx: action.payload.objidx,
    }),
  },
  initialState,
);

export default svgcanvas;
