import * as actionTypes from '../actionTypes';

const initState = {
  loading: false,
  error: null,
  isLogin: !!localStorage.getItem('chat-pokemon-info')
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLogin: true
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.errorMsg,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        error: null,
        loading: false,
        isLogin: false
      };
    default:
      return state;
  }
};

export default authReducer;
