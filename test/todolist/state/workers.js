import { State } from '../../../index';

function taskWorker (state, action) {
  switch (action.type) {
    case 'TASK_ADD':
      state.tasks.unshift(action.task);
      return state;
    case 'TASK_UPDATE':
      // Find index in state by action.task.id and replace object in state with action.task
    case 'TASK_REMOVE':
      state = state.tasks.filter(task => task.id !== +action.task.id );
      return state;
    default:
      return state;
  }
};

function inputWorker (state, action) {
  switch(action.type) {
    case 'INPUT_CHANGE': {
      state[action.field] = action.value;
      return state;
    }
    default:
      return state;
  }
}

const workers = State.mergeWorkers({ taskWorker, inputWorker });

export default workers;