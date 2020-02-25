import * as actionTypes from '../actionTypes';

const initState = {
  loading: false,
  error: null,
  formId: null,
  friends: null,
  userInfo: {
    userName: null,
    avatar: null
  },
  member: null
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        formId: action.infoData.formId,
        friends: action.infoData.info.friends,
        userInfo: {
          userName: action.infoData.info.userName,
          avatar: action.infoData.info.avatar
        },
        member: action.infoData.member
      };
    case actionTypes.CHAT_FAIL:
      return {
        ...state,
        userInfo: null,
        friends: null,
        member: null
      };
    default:
      return state;
  }
};

export default chatReducer;
