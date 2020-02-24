import * as actionTypes from '../actionTypes';

const initState = {
  loading: false,
  error: null,
  friends: null,
  userName: null,
  avatar: null
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
      const infoData = action.infoData.info;
      console.log(infoData);
      return {
        ...state,
        loading: false,
        error: null,
        userName: infoData.userName,
        avatar: infoData.avatar,
        friends: infoData.friends
      };
    case actionTypes.CHAT_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default chatReducer;
