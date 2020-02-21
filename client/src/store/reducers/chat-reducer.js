import * as actionTypes from '../actionTypes';

const initState = {
  loading: false,
  error: null,
  friends: null
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default chatReducer;
