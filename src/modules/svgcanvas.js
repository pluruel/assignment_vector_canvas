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
const CHANGE_CANVAS_VIEW = 'svgcanvas/CHANGE_CANVAS_VIEW';
const SET_ZOOM_RATIO = 'svgcanvas/SET_ZOOM_RATIO';
const SET_CRNT_SHAPE = 'svgcanvas/SET_CRNT_SHAPE';
const ADD_POLY_POINTS = 'svgcanvas/ADD_POLY_POINTS';
const FIX_ATTR_CRNT_SHAPE = 'svgcanvas/FIX_ATTR_CRNT_SHAPE';

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
export const changeCanvasView = createAction(CHANGE_CANVAS_VIEW);
export const setZoomRatio = createAction(SET_ZOOM_RATIO);
export const setCrntShape = createAction(SET_CRNT_SHAPE);
export const addPolyPoints = createAction(ADD_POLY_POINTS);
export const fixAttrCrntShape = createAction(FIX_ATTR_CRNT_SHAPE);

const initialState = {
  selectedColor: '#000000',
  selectedTool: 'line',
  selectedSize: '5',
  objidx: 0,
  svg: {
    name: 'svg',
    type: 'element',
    value: '',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      x: 0,
      y: 0,
      width: 640,
      height: 480,
      viewBox: '0 0 640 480',
    },
    children: [],
  },
  currentStep: 0,
  obj: [[]],
  zoomRatio: 1.0,
  crntShape: null,
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
      crntShape: null,
    }),
    [SELECT_SIZE]: (state, action) => ({
      ...state,
      selectedSize: action.payload.target.value,
    }),
    [ADD_SHAPE]: (state, action) => ({
      ...state,
      obj: state.obj
        .slice(0, state.currentStep + 1)
        .concat([state.obj[state.currentStep].concat(action.payload)]),
      currentStep: state.currentStep + 1,
      objidx: state.objidx + 1,
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      obj: state.obj
        .slice(0, state.currentStep + 1)
        .concat([
          state.obj[state.currentStep].filter(e => action.payload !== e.id),
        ]),
    }),
    [UNDO]: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
      crntShape: null,
    }),
    [REDO]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      crntShape: null,
    }),
    [INITIALSTATE]: (state, action) => ({
      state: initialState,
    }),
    [IMPORTS]: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
      obj: state.obj
        .slice(0, state.currentStep + 1)
        .concat([action.payload.objs]),
      svg: action.payload.svg,
      objidx: action.payload.objidx,
      crntShape: null,
    }),
    [CHANGE_CANVAS_VIEW]: (state, action) => ({
      ...state,
      svg: {
        ...state.svg,
        attributes: {
          ...state.svg.attributes,
          viewBox: action.payload,
        },
      },
    }),
    [SET_ZOOM_RATIO]: (state, action) => ({
      ...state,
      zoomRatio: action.payload,
    }),
    [SET_CRNT_SHAPE]: (state, action) => ({
      ...state,
      crntShape: action.payload,
    }),
    [ADD_POLY_POINTS]: (state, action) => ({
      ...state,
      crntShape: {
        ...state.crntShape,
        attributes: {
          ...state.crntShape.attributes,
          points: state.crntShape.attributes.points.concat(action.payload),
        },
      },
    }),
    [FIX_ATTR_CRNT_SHAPE]: (state, action) => ({
      ...state,
      crntShape: {
        ...state.crntShape,
        attributes: { ...state.crntShape.attributes, ...action.payload },
      },
    }),
  },
  initialState,
);

export default svgcanvas;
