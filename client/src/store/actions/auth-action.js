import * as actionTypes from '../actionTypes';
import {
  ajaxSignIn,
  ajaxSignUp,
  ajaxBuildNewMember
} from '../../shared/service';

export const authActions = {
  start: () => {
    return {
      type: actionTypes.AUTH_START
    };
  },
  success: () => {
    return {
      type: actionTypes.AUTH_SUCCESS
    };
  },
  fail: (msg, err) => {
    console.log(err.response);
    return {
      type: actionTypes.AUTH_FAIL,
      errorMessage: msg
    };
  },
  logOut: () => {
    return {
      type: actionTypes.AUTH_LOGOUT
    };
  }
};

export const onAuth = data => {
  return async dispatch => {
    dispatch(authActions.start());
    try {
      let authResponse = null;
      const authData = {
        email: data.email,
        password: data.password
      };

      if (data.authStatus === 'signUp') {
        // 註冊處理程序
        authResponse = await ajaxSignUp(authData);
        await ajaxBuildNewMember(authResponse.data.localId, data.userName);
      } else {
        // 登入處理程序
        authResponse = await ajaxSignIn(authData);
      }
      console.log(authResponse);

      // 儲存使用者登入資料於本機
      localStorage.setItem(
        'chat-pokemon-info',
        JSON.stringify(authResponse.data)
      );

      dispatch(authActions.success());
    } catch (error) {
      let errorMessage = '';
      data.authStatus === 'signUp'
        ? (errorMessage = '註冊失敗,請重新再試一次')
        : (errorMessage = '登入失敗,請確認後資料再試一次');
      dispatch(authActions.fail(errorMessage, error));
    }
  };
};

export const onLogOut = () => {
  return dispatch => {
    localStorage.removeItem('chat-pokemon-info');
    dispatch(authActions.logOut());
  };
};
