import { ADD_STACK_ITEM, DEL_STACK_ITEM } from './mutation-types';

function processError({ commit, url, error }) {
  
  if (error && error.response.data.responseHeader.errorCode)  {
    let { errorCode, errorMessage } = error.response.data.responseHeader;
  } else {
    console.log(error);
  }

  commit(`commons/${DEL_STACK_ITEM}`, { url }, { root: true });

}

export function asyncRequest({ commit, apiItem, payload, switchRoutingFunc }) {

  let { handler, respMutation, callbackMutation } = apiItem;
  commit(`commons/${ADD_STACK_ITEM}`, { url: handler.url, val: (new Date()).getTime() }, { root: true });
  
  return new Promise((resolve, reject) => {
    handler.func(payload).then((resp) => {
      let respData = resp.data;
      if (respMutation) {
        commit(respMutation, respData.payload);
      }
      commit(`commons/${DEL_STACK_ITEM}`, { url: handler.url }, { root: true });
    }).catch((error) => {
      processError({commit, url: handler.url, error});
    });
  }).catch((error) => {
    processError({commit, url: handler.url, error});
  });

};