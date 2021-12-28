
import {
  ADD_STACK_ITEM,
  DEL_STACK_ITEM
} from "../mutation-types";

export default {

  [ADD_STACK_ITEM](state, payload) {
    let stack = { ...state.apiStack };
    stack[payload.url] = payload.data;
    state.apiStack = stack;
  },

  [DEL_STACK_ITEM](state, payload) {
    let stack = { ...state.apiStack };
    delete stack[payload.url];
    state.apiStack = stack;
  },
  save(state, payload = {}) {
    if (!payload || typeof payload !== 'object') {
      return;
    }
    Object.keys(payload).forEach(key => {
      const value = payload[key];
      state[key] = value;
    });
  },
};
