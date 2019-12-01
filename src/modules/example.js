import { handleActions, createAction } from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';
import {
  createTree,
  createList,
  searchLeaf,
  createLeaf,
} from '../lib/TreeViewer/TreeCreator';
import produce from 'immer';
import { prototype } from 'events';
import createRequestThunkForTree from '../lib/createRequestThunkForTree';

const GET_CLASSES = 'classes/GET_CLASSES';
const GET_CLASSES_SUCCESS = 'classes/GET_CLASSES_SUCCESS';
const GET_VALUE_DEFINITION = 'classes/GET_VALUE_DEFINITION';
const GET_VALUE_DEFINITION_SUCCESS = 'classes/GET_VALUE_DEFINITION';
const POST_CLASS = 'classes/POST_CLASS';
const POST_CLASS_SUCCESS = 'classes/POST_CLASS_SUCCESS';
const DELETE_CLASS = 'classes/DELETE_CLASS';
const DELETE_CLASS_SUCCESS = 'classes/DELETE_CLASS_SUCCESS';

const EXPAND_CLASS = 'classes/EXPAND_CLASS';
const SELECT_CLASS = 'classes/SELECT_CLASS';
const PUT_CLASS_PROPS = 'classes/PUT_CLASS_PROPS';

const initialState = {
  rootnode: null,
  classes: [],
  definition: null,
  rootClass: null,
  attrList: null,
  selectedClass: null,
};

export const getClasses = createRequestThunk(GET_CLASSES, api.getClasses);
export const getValueDefinition = createRequestThunk(
  GET_VALUE_DEFINITION,
  api.getValueDefinition,
);
export const postClass = createRequestThunkForTree(POST_CLASS, api.postClass);
export const deleteClass = createRequestThunkForTree(
  DELETE_CLASS,
  api.deleteClass,
);
export const expandClass = createAction(EXPAND_CLASS);
export const selectClass = createAction(SELECT_CLASS);
export const putClassProps = createAction(PUT_CLASS_PROPS);

const classes = handleActions(
  {
    [GET_CLASSES_SUCCESS]: (state, action) => {
      const c = createTree(action.payload.classes, action.params);

      return produce(state, draft => {
        draft.rootClass = action.params;
        draft.rootnode = c;
        draft.classes = createList(c);
        draft.attrList = action.payload.attrList;
        draft.reference = action.payload.reference;
      });
    },
    [GET_VALUE_DEFINITION_SUCCESS]: (state, action) => {
      return {
        ...state,
        definition: action.payload.definition,
      };
    },

    [EXPAND_CLASS]: (state, { payload: id }) => {
      const idx = state.classes.findIndex(classs => classs.id === id);

      return produce(state, draft => {
        draft.classes[idx].isopend = !draft.classes[idx].isopend;
        draft.classes = createList(draft.rootnode);
      });
    },
    [PUT_CLASS_PROPS]: (state, { payload: { id, className, props } }) => {
      const targetLeaf = searchLeaf(state.rootnode, className, id);

      return produce(state, draft => {
        targetLeaf.attr = { ...targetLeaf.attr, ...props };
        draft.classes = createList(draft.rootnode);
      });
    },
    [POST_CLASS_SUCCESS]: (state, action) => {
      const addedclass = action.params.datas.classname;
      // 메인 클래스
      if (addedclass === state.rootClass) {
        return produce(state, draft => {
          draft.rootnode.children = [
            ...state.rootnode.children,
            ...createLeaf(action.payload, addedclass).children,
          ];
          draft.classes = createList(draft.rootnode);
        });
      } else {
        // 서브 클래스
        return produce(state, draft => {
          let c = action.params.currentNode;
          const b = createLeaf(action.payload, addedclass).children;
          b.forEach(e => {
            c.addchild(e);
          });
          if (b.length) c.hasChildren = true;
          draft.classes = createList(state.rootnode);
        });
      }
    },
    [DELETE_CLASS_SUCCESS]: (state, action) => {
      const currentNode = action.params.currentNode;
      const parent = currentNode.parent;

      parent.children = parent.children.filter(
        e => e !== currentNode && e.realParent !== currentNode,
      );
      return produce(state, draft => {
        draft.classes = createList(state.rootnode);
      });
      // 메인 클래스
    },
  },
  initialState,
);

export default classes;
