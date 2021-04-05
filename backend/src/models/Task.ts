export default class Task {
  id: number;

  description: string;

  type: string;

  amount: number;

  user_id: number;

  constructor() {
    this.id = 0;
    this.description = '';
    this.type = '';
    this.amount = 0;
    this.user_id = 0;
  }
}