export class IUser {
  website: string;
  city: string;
  first_name: string;
  last_name: string;
  description: string;
  phone: string;
  username: string;
  email: string;
}

 export class IEmployee {

   constructor(values: Object = {}) {
   //Constructor initialization
   Object.assign(this, values);
    }

   id: number;
   name: string;
   age: number;
   mob: number;
   email: string;
   address: string;
   designation: string;

 }

 export class Signup {
  constructor(public firstName:string = '',
              public lastName:string = '',
              public email:string = '',
              public password:string = '',
              public language:string = '') {
  }
}

export class User {
 constructor(public id:string = '',
             public name:string = '',
             public email:string = '',
             public mobile1:string = '',
             public mobile2:string = '',
             public designation:string = '') {
 }
}
