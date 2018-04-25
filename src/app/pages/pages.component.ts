import { Component,OnInit } from '@angular/core';

import { MENU_ITEMSADM,MENU_ITEMSUSR } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  public permission
  menu:any;
  ngOnInit(){
    var grpadmin = JSON.parse(sessionStorage.getItem('groupadmin'));
console.log(grpadmin);
var svcadmin = JSON.parse(sessionStorage.getItem('svcadmin'));
console.log(svcadmin);
if(grpadmin == "1" || svcadmin == "1"){
 this.permission = false;
 console.log(this.permission);
 this.menu = MENU_ITEMSADM;
}

else {
  this.permission = true;
  console.log(this.permission);
  this.menu = MENU_ITEMSUSR;
}
console.log(this.permission)
  }

  // menu = MENU_ITEMS;
}
