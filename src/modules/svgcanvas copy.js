import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const initialState = { objs: ['ddd'] };

const svgcanvas = handleActions({}, initialState);

export default svgcanvas;
