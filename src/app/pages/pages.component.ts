import { Component,OnInit } from '@angular/core';

import { MENU_ITEMSADM,MENU_ITEMSUSR ,MENU_INSURANCESUSR} from './pages-menu';

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
    var GrpAdmin = JSON.parse(sessionStorage.getItem('groupadmin'));
    var SvcAdmin = JSON.parse(sessionStorage.getItem('svcadmin'));
    var InsuAdmin = JSON.parse(sessionStorage.getItem('insurance'));
    console.log(InsuAdmin);
    if(GrpAdmin == "1" || SvcAdmin == "1"){
      // this.permission = false;
      this.menu = MENU_ITEMSADM;
}
else if (InsuAdmin == "1"){
  this.menu = MENU_INSURANCESUSR;
}
else {
  // this.permission = true;
  this.menu = MENU_ITEMSUSR;
  }
  }

  // menu = MENU_ITEMS;
}
