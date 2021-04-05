
export default class Profile {
  id: number;

  level: number;

  xp: number;

  tasks_completed: number;

  user_id: number;

  constructor() {
    this.id = 0;
    this.level = 1;
    this.xp = 20;
    this.tasks_completed = 0;
    this.user_id = 0;
  }
}