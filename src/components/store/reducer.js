import * as CONSTANTS from './constants';
import countries from '../../countries';

const initialState = {
    countries,
    active: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SET_ACTIVE_COUNTRY:
      return { 
        ...state, 
        active: action.country
      };
    default:
      return state;
  }
}

// Action creators
export const setCountry = (country) => ({
  type: CONSTANTS.SET_ACTIVE_COUNTRY,
  country
});

export { reducer, initialState };