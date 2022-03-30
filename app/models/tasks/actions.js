import TASKS_ACTIONS from './actionTypes';

export const getTasks = (dispatch) => {
  dispatch({
    type: TASKS_ACTIONS.GET_TASKS.REQUEST,
  });
}

export function addTask(task) {
  return {
    type: TASKS_ACTIONS.ADD_TASK.REQUEST,
    task,
  };
};

export function editTask(task) {
  return {
    type: TASKS_ACTIONS.EDIT_TASK.REQUEST,
    task,
  };
};

export function removeTask(id) {
  return {
    type: TASKS_ACTIONS.REMOVE_TASK.REQUEST,
    id,
  };
};

export function setEditTask(id) {
  return {
    type: TASKS_ACTIONS.SET_EDIT_TASK,
    id,
  };
}


