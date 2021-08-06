import { store } from './store';
import * as CONSTANTS from '../constants';

export function setActiveOption(option) {
  store.dispatch({
    type: CONSTANTS.SET_ACTIVE_OPTION,
    option
  });
}
