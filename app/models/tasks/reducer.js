import TASKS_ACTIONS from './actionTypes';

const initialState = {
  isLoading: false,
  taskList: [],
  currentTask: null,
  plaidLinkToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.GET_TASKS.REQUEST: {
      return { ...state, ...{ isLoading: true } };
    }
    case TASKS_ACTIONS.GET_TASKS.SUCCESS: {
      return {
        ...state,
        taskList: action.taskList,
        isLoading: false,
        plaidLinkToken: action.plaidLinkToken,
      };
    }
    case TASKS_ACTIONS.GET_TASKS.ERROR: {
      return { ...state, ...{ isLoading: false } };
    }
    case TASKS_ACTIONS.ADD_TASK.SAVE_LOCALLY: {
      return { ...state, ...{ taskList: [...state.taskList, action.task] } };
    }
    case TASKS_ACTIONS.SET_EDIT_TASK: {
      return { ...state, currentTask: action.id };
    }
    case TASKS_ACTIONS.EDIT_TASK.SAVE_LOCALLY: {
      const tasks = state.taskList.map((t) => {
        if (t.id !== action.task.id) {
          return t;
        }
        return action.task;
      });
      return { ...state, ...{ taskList: tasks } };
    }
    case TASKS_ACTIONS.REMOVE_TASK.SAVE_LOCALLY: {
      const tasks = state.taskList.filter((t) => t.id !== action.id);
      return { ...state, ...{ taskList: tasks } };
    }
    default:
      return state;
  }
};
export { reducer };
