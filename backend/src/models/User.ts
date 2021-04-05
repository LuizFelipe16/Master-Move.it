export default class User {
  id: number;

  name: string;

  email: string;
  
  gender: string;

  password: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.gender = '';
    this.email = '';
    this.password = '';
  }
}