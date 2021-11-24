import { State } from '../../../index';

function taskWorker (state, action) {
  switch (action.type) {
    case 'TASK_ADD':
      state.tasks.unshift(action.task);
      return state;
    case 'TASK_CHANGE': 
      state.tasks.forEach(task => {
        if (task.id === +action.task.id) 
          task.done = !task.done;
      })
      
      state.toChange = action.task.id;
      return state;
    case 'TASK_REMOVE':
      state.tasks = state.tasks.filter(task => task.id !== +action.task.id );
      state.lastDeleted = action.task.id;
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