import { combineReducers } from 'redux';
import { reducer as tasksReducer } from './tasks/reducer';

const reducer = combineReducers({
  task: tasksReducer,
});
export default reducer;
