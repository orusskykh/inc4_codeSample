import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeEvery, put, delay } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import TASKS_ACTIONS from './actionTypes';
// Sagas
function* getAllUserInfo(action) {
  try {
    yield delay(3000);
    const taskList = yield AsyncStorage.getItem('tasks');
    yield put({
      type: TASKS_ACTIONS.GET_TASKS.SUCCESS,
      taskList: !isEmpty(taskList) ? JSON.parse(taskList) : [],
    });
  } catch (err) {
    yield put({
      type: TASKS_ACTIONS.GET_TASKS.ERROR,
      err,
    });
  }
}

function* addTask(action) {
  const { task } = action;
  task.id = ~~(Date.now() / 1000);
  try {
    // Save locally immiditely
    yield put({
      type: TASKS_ACTIONS.ADD_TASK.SAVE_LOCALLY,
      task,
    });

    // Save to async storage ( async immitation of external API, I know about redux-persist)
    let taskList = yield AsyncStorage.getItem('tasks');
    if (!isEmpty(taskList)){
      taskList = JSON.parse(taskList);
      taskList = [...taskList, task];
    } else {
      taskList = [task];
    }
    yield AsyncStorage.setItem('tasks', JSON.stringify(taskList));
    if (taskList !== null) {
      yield put({
        type: TASKS_ACTIONS.ADD_TASK.SUCCESS,
      });
    }
  } catch (err) {
    yield put({
      type: TASKS_ACTIONS.ADD_TASK.ERROR,
      err,
    });
  }
}

function* editTask(action) {
  try {
    // Save locally immiditely
    yield put({
      type: TASKS_ACTIONS.EDIT_TASK.SAVE_LOCALLY,
      task: action.task,
    });

    // Save to async storage ( async immitation of external API )
    let taskList = yield AsyncStorage.getItem('tasks');
    taskList = JSON.parse(taskList);
    taskList = taskList.map((t) => {
      if (t.id !== action.task.id) {
        return t;
      }
      return action.task;
    });
    yield AsyncStorage.setItem('tasks', JSON.stringify(taskList));
    yield put({
      type: TASKS_ACTIONS.EDIT_TASK.SUCCESS,
    });
  } catch (err) {
    yield put({
      type: TASKS_ACTIONS.ADD_TASK.ERROR,
      err,
    });
  }
}

function* removeTask(action) {
  try {
    // Save locally immiditely
    yield put({
      type: TASKS_ACTIONS.REMOVE_TASK.SAVE_LOCALLY,
      id: action.id,
    });

    // Save to async storage ( async immitation of external API )
    let taskList = yield AsyncStorage.getItem('tasks');
    taskList = JSON.parse(taskList);
    taskList = taskList.filter((t) => t.id !== action.id);
    yield AsyncStorage.setItem('tasks', JSON.stringify(taskList));
    yield put({
      type: TASKS_ACTIONS.REMOVE_TASK.SUCCESS,
    });

  } catch (err) {
    yield put({
      type: TASKS_ACTIONS.ADD_TASK.ERROR,
      err,
    });
  }
}

function* handler() {
  yield takeEvery(TASKS_ACTIONS.GET_TASKS.REQUEST, getAllUserInfo);
  yield takeEvery(TASKS_ACTIONS.ADD_TASK.REQUEST, addTask);
  yield takeEvery(TASKS_ACTIONS.EDIT_TASK.REQUEST, editTask);
  yield takeEvery(TASKS_ACTIONS.REMOVE_TASK.REQUEST, removeTask);
}
export { handler };
