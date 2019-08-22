import { combineReducers } from 'redux'

import {app} from './app'
import {post} from './post'
import {loading} from "./loading";
import {progress} from "./progress";

const reducers = combineReducers({
  app,
  post,
  loading,
  progress,
});

export default reducers;