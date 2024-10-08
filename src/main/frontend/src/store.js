import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {logout, reducer as authReducer} from './auth';
import {reducer as layoutReducer} from './layout';
import {api as userApi} from './users';
import {api as projectApi} from './projects';
import {api as taskApi} from './tasks';

const appReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  [projectApi.reducerPath] : projectApi.reducer,
  [userApi.reducerPath] : userApi.reducer,
  [taskApi.reducerPath] : taskApi.reducer
});

const rootReducer = (state, action) => {
  if (logout.match(action)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
  .concat(projectApi.middleware)
  .concat(userApi.middleware)
  .concat(taskApi.middleware)
});