const initialState = {
  isAuth: false,
  userData: {
    username: null,
    email: null,
    image: null,
  },
};

const loginReducer = (state = initialState, action = {}) => {
  const SET_USER_DATA = 'setUserData';
  const SET_LOG_IN = 'setLogIn';
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.userData };
    case SET_LOG_IN:
      return { ...state, isAuth: action.status };
    default:
      return state;
  }
};

export default loginReducer;
