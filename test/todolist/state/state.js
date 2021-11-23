import { State } from '../../../index';
import workers from './workers';

const init = { taskWorker: { tasks: [] }, inputWorker: { title: '', description: '' } };
const state = new State(workers, init);

state.createAction('inputChange', { type: 'INPUT_CHANGE' });
state.createAction('taskAdd', { type: 'TASK_ADD' });
state.createAction('taskRemove', { type: 'TASK_REMOVE' });

export default state;