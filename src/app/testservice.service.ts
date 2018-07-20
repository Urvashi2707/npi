import { Injectable } from '@angular/core';

@Injectable()
export class TestserviceService {

  constructor() { }
  servicingFun(){
    const a = 1;
    const b = 2;
    const c = a + b;
    console.log(c);
    return c;
  }
}
