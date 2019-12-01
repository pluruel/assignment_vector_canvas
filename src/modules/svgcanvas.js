import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SELECT_COLOR = 'svgcanvas/SELECT_COLOR';
const SELECT_TOOL = 'svgcanvas/SELECT_TOOL';
export const selectColor = createAction(SELECT_COLOR);
export const selectTool = createAction(SELECT_TOOL);

const initialState = { selectedColor: '#000000', selectedTool: 'R' };

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
  },
  initialState,
);

export default svgcanvas;
