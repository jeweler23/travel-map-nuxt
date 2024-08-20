export default class UserDto {
  email: string;
  id: string;
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
  }
}
