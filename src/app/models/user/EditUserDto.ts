export class EditUserDto {
  email: string;
  firstName: string;
  lastName: string;
  birth: Date;
  phoneNumber: string;
  constructor(
    email: string,
    firstName: string,
    lastName: string,
    birth: Date,
    phoneNumber: string
  ) {
    (this.email = email),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.birth = birth),
      (this.phoneNumber = phoneNumber);
  }
}
