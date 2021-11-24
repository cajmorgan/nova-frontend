import { Generator } from '../../index';
import state from "./state/state"

const generator = new Generator()

function task() {
  const taskState = state.getState().taskWorker.tasks;
  const task = generator.createTree(`
    article className: '{{done}}' id: '{{id}}'
      h2 className: 'task__title' innerText: '{{title}}'
      p className: 'task__description' innerText: '{{description}}'
      button className: 'task__remove-button' innerText: 'X'
  end`)

  task.setProps({
    id: taskState[0].id, 
    title: taskState[0].title, 
    description: taskState[0].description,
    done: taskState[0].done ? 'task-done' : 'task'
  })

  return task
}

export default task;