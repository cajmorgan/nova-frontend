import { State } from '../../../index';
import workers from './workers';

const init = { taskWorker: [], inputWorker: { title: '', description: '' } };
const state = new State(workers, init);

state.createAction('inputChange', { type: 'INPUT_CHANGE' })

export default state;