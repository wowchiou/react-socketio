import * as actionTypes from '../actionTypes';
import { ajaxGetClientInfo } from '../../shared/service';

const chatActions = {
  start: () => {
    return {
      type: actionTypes.CHAT_START
    };
  },
  success: data => {
    return {
      type: actionTypes.CHAT_SUCCESS,
      infoData: data
    };
  },
  fail: err => {
    console.log(err.response);
    return {
      type: actionTypes.CHAT_FAIL
    };
  }
};

export const getClientInfo = () => {
  return async dispatch => {
    dispatch(chatActions.start());
    try {
      const userId = JSON.parse(localStorage.getItem('chat-pokemon-info'))
        .localId;
      const res = await ajaxGetClientInfo(userId);
      const formateRes = Object.keys(res.data)
        .map(itm => {
          return { formId: itm, info: res.data[itm] };
        })
        .reduce((obj, itm) => {
          return { ...obj, ...itm };
        }, {});
      console.log(formateRes);
      dispatch(chatActions.success(formateRes));
    } catch (error) {
      dispatch(chatActions.fail(error));
    }
  };
};
