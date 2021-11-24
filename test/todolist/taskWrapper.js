import state from "./state/state";
import { Group, Element, root } from '../../index';
import task from './task';

const taskWrapper = new Element('section', root, { className: 'task-wrapper' });
const tasks = new Group([], taskWrapper);
tasks.render();

function addTask() {
  const newTask = task();
  const componentArray = tasks.components;
  componentArray.push(newTask);
  tasks.update(componentArray);
  tasks.components.forEach(comp => {
    if (comp.elements[0].className === 'task')
      comp.retrieve('.task__remove-button')[0].removeNode()
  });
  
  const removeBtn = newTask.retrieve('.task__remove-button')[0];
  const main = newTask.elements[0];
  main.addEventListener('click', e => {
    if (e.target.tagName === 'ARTICLE') {
      state.dispatch(state.getAction('taskChange', { task: { id: e.target.id }} ))
      removeBtn.toggleNode();
    }
  })

  removeBtn.addEventListener('click', e => {
    state.dispatch(state.getAction('taskRemove', { task: { id: e.target.parentNode.id }}))
  })
} 

function removeTask() {
  const { lastDeleted } = state.getState().taskWorker;
  tasks.deleteById(lastDeleted);
}

function changeTask() {
  const { toChange } = state.getState().taskWorker;
  const task = tasks.retrieve(toChange);
  task[0].className === 'task' 
    ? task[0].updateNode({ className: 'task-done' })
    : task[0].updateNode({ className: 'task' })
  
}

state.subscribe({ type: 'TASK_ADD', func: addTask });
state.subscribe({ type: 'TASK_CHANGE', func: changeTask });
state.subscribe({ type: 'TASK_REMOVE', func: removeTask })

export { state, taskWrapper }