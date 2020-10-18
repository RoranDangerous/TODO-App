import { useState } from 'react';

export default () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )

  // Add/Update task to the list and local storage
  const addTask = task => {
    if(!task?.message){
      return 'Task message cannot be empty.'
    }

    if(tasks.find(t => t.message === task.message)){
      return 'Task already in the list.'
    }

    const newTasks = [ task, ...tasks ]

    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  // Update task in the list and local storage
  const updateTask = (old_task_message, new_task) => {
    if('message' in new_task && !new_task?.message){
      return 'Task message cannot be empty.'
    }

    if('message' in new_task && tasks.find(t => t.message === new_task.message)){
      return 'Task already in the list.'
    }

    const newTasks = [ ...tasks ].map(t => t.message === old_task_message ? { ...t, ...new_task} : t);

    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  return { tasks, addTask, updateTask };
}