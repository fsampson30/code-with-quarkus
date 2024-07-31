import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer as layoutReducer} from './layout';
import { logout } from './auth/redux';

const appReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer
});

const rootReducer = (state, action) => {
  if (logout.match(action)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware)
});