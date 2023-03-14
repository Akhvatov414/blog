const initialState = {
  isLoading: 'Loading',
};

const loadingReducer = (state = initialState, action = {}) => {
  const SET_LOADING = 'setLoadingStatus';
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};

export default loadingReducer;
