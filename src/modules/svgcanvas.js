import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SELECT_COLOR = 'svgcanvas/SELECT_COLOR';
export const selectColor = createAction(SELECT_COLOR);

const initialState = { selectedColor: '#000000' };

const svgcanvas = handleActions(
  {
    [SELECT_COLOR]: (state, action) => ({
      ...state,
      selectedColor: action.payload,
    }),
  },
  initialState,
);

export default svgcanvas;
