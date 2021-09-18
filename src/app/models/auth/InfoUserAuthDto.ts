export class InfoUserAuthDto {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birth: string;
  photoPath: string;
  profession: string;
  customer: string;
  customerId: number;
  roles: string[];
  constructor(
    id: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    birth: string,
    photoPath: string,
    profession: string,
    customer: string,
    customerId: number,

    roles: string[]
  ) {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.photoPath = photoPath;
    this.profession = profession;
    this.customer = customer;
    this.customerId = customerId;
    this.roles = roles;
  }
}
