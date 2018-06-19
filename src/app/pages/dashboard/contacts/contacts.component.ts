import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import {ListService} from '../../../pages/services/user.service';
import { UserService } from '../../../@core/data/users.service';
import {Router,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  username : string;
 URL:string = 'http://192.168.11.77:3000/getChat';
  type_of_chat :string = "0";
  today: number = Date.now();
  constructor(private userService: UserService,
              private _data : ListService,
              private themeService: NbThemeService,
              private router: Router,
              private datePipe:DatePipe,
              private http:HttpClient,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {

    this.userService.getUsers()
      .subscribe((users: any) => {
        this.contacts = [
          {user: users.nick, type: 'mobile'},
          {user: users.eva, type: 'home'},
          {user: users.jack, type: 'mobile'},
          {user: users.lee, type: 'mobile'},
          {user: users.alan, type: 'home'},
        
        ];

        this.recent = [
          {user: users.alan, type: 'home', time: '9:12 pm'},
          {user: users.eva, type: 'home', time: '7:45 pm'},
          {user: users.nick, type: 'mobile', time: '5:29 pm'},
          {user: users.lee, type: 'mobile', time: '11:24 am'},
          {user: users.jack, type: 'mobile', time: '10:45 am'},
          {user: users.kate, type: 'work', time: '9:42 am'}
        ];
      });
      this.username = sessionStorage.getItem('username');
      this.getChat();
  }

  replyMessage = "";
  message =[];
  message1 =[];

reply(){
  console.log(this.type_of_chat);
  console.log(this.replyMessage);
  this.message.push({
    "creation_time": this.datePipe.transform(this.today,"y.MM.d h:mm:ss"),
    "user_name": this.username,
    "is_incoming": "1",
    "chat": this.replyMessage,
    "type_of_chat": this.type_of_chat
  })
  
  console.log(this.replyMessage);
  console.log(this.message);
  const reqpara2 = {
    requesttype:"postchat",
    chat:this.replyMessage,
    typeofchat:this.type_of_chat
  }
  const as2 = JSON.stringify(reqpara2)
    this._data.webServiceCall(as2).subscribe(res => {
  if(res[0].login === 0){
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
  else{
    console.log(res);
  }
 
    });
    this.replyMessage = "";
}

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  getChat(){
    const reqpara4 = {
      requesttype:"getchat"
        }
    const as4 = JSON.stringify(reqpara4)
    this._data.webServiceCall(as4).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        console.log(res)
        this.message = res[0].chat;
        console.log(this.message)
      }
     
        });
  }


  getChat1(){
    const reqpara21 = {
      requesttype:"postchat",
      chat:this.replyMessage,
      typeofchat:this.type_of_chat
    }
    const as4 = JSON.stringify(reqpara21)
    this.http.post(this.URL,reqpara21).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        console.log(res)
        this.message = res[0].chat;
        console.log(this.message)
      }
     
        });
  }


}
