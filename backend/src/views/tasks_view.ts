import Task from '../models/Task';

export default {
  render(task: Task) {
    return {
      id: task.id,
      description: task.description,
      type: task.type,
      amount: task.amount,
    }
  },

  renderMany(tasks: Task[]) {
    return tasks.map(task => this.render(task));
  }
}