import {combineReducers} from 'redux';

import login from './loginReducer';
import register from './registerReducer';
import blogs from './blogReducer';

export default combineReducers({
  login,
  register,
  blogs,
});