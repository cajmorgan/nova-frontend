import state from "./state/state"
import { Group, Element, Generator, root } from '../../index';


const generator = new Generator()
const taskWrapper = new Element('section', root, { className: 'task-wrapper' });
const tasks = new Group([], taskWrapper);
tasks.render();

function addTask() {
  const newTask = state.getState().taskWorker.tasks;
  const task = generator.createTree(`
    article className: 'task' id: '{{id}}'
      h2 className: 'task__title' innerText: '{{title}}'
      p className: 'task__description' innerText: '{{description}}'
      button className: 'task__remove-button' innerText: 'X'
  end`)

  task.setProps({
    id: newTask[0].id, 
    title: newTask[0].title, 
    description: newTask[0].description 
  })
  
  const componentArray = tasks.components;
  componentArray.push(task);
  tasks.update(componentArray);
  tasks.components.forEach(btn => btn.retrieve('.task__remove-button')[0].removeNode());
  removeBtn(task);  
} 

function removeTask() {
  const tasks = state.getState().taskWorker.tasks;
  const componentArray = tasks.components;
  
  tasks.components.forEach(btn => btn.retrieve('.task__remove-button')[0].removeNode());
}

function removeBtn(task) {
  const main = task.elements[0];
  const removeBtn = task.retrieve('.task__remove-button')[0];
  main.addEventListener('click', e => {
    if (e.target.tagName === 'ARTICLE') {
      main.className === 'task' 
      ? main.updateNode({ className: 'task-done' })
      : main.updateNode({ className: 'task' });
      removeBtn.toggleNode();
    }
  })

  removeBtn.addEventListener('click', e => {
    state.dispatch(state.getAction('taskRemove', { task: { id: e.target.parentNode.id }}))
  })
}

state.subscribe({ type: 'TASK_ADD', func: addTask });
state.subscribe({ type: 'TASK_REMOVE', func: removeTask })

export { state, taskWrapper }