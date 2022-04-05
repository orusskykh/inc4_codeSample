import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  takeEvery, put, delay, call,
} from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import axios from 'axios';
import TASKS_ACTIONS from './actionTypes';
import ENDPOINTS from '../../constants/endpoints';

const plaidTokenRequestData = {
  client_id: '624c2495d1d9c80019aff378',
  secret: '4e69d565bf731a4ced01c69b2ca9d6',
  user: { client_user_id: '89348934893485493' },
  client_name: 'TEST_APP',
  products: ['auth'],
  country_codes: ['US'],
  language: 'en',
  account_filters: {
    depository: {
      account_subtypes: ['checking'],
    },
  },
};

// Sagas
function* getAllUserInfo(action) {
  try {
    const taskList = yield AsyncStorage.getItem('tasks');

    const response = yield call(axios.post, ENDPOINTS.PLAID_LINK_TOKEN_CREATE, plaidTokenRequestData);

    if (response.status === 200) {
      yield put({
        type: TASKS_ACTIONS.GET_TASKS.SUCCESS,
        taskList: !isEmpty(taskList) ? JSON.parse(taskList) : [],
        plaidLinkToken: response.data.link_token,
      });
    } else { throw response.status; }
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

    // Save to async storage ( async imitation of external API, I know about redux-persist)
    let taskList = yield AsyncStorage.getItem('tasks');
    if (!isEmpty(taskList)) {
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
