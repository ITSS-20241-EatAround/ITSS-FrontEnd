import { SET_TOKEN, REMOVE_TOKEN } from "../../shared/constants/action";
import { saveTokenToLocalStorage, removeTokenFromLocalStorage, getTokenFromLocalStorage } from "../../services/localtoken";

const initState = {
  token: getTokenFromLocalStorage(),
};


export default (state = initState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      saveTokenToLocalStorage(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case REMOVE_TOKEN:
      removeTokenFromLocalStorage();
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
