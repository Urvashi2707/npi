import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import {ServerService} from '../../../pages/services/user.service';
import {Router} from '@angular/router';
import {DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  username : string;
  type_of_chat :string = "0";
  ReplyMessage = "";
  Message =[];
  today: number = Date.now();

  constructor(private _data : ServerService,
              private themeService: NbThemeService,
              private router: Router,
              private datePipe:DatePipe,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {
      this.username = sessionStorage.getItem('username');
      this.GetChat();
  }

  

//Post Chat  API call
ReplyChat(){
  this.Message.push({
    "creation_time": this.datePipe.transform(this.today,"y.MM.d h:mm:ss"),
    "user_name": this.username,
    "is_incoming": "1",
    "chat": this.ReplyMessage,
    "type_of_chat": this.type_of_chat
  })
  const ChatReq = {
    requesttype:"postchat",
    chat:this.ReplyMessage,
    typeofchat:this.type_of_chat
  }
  const ChatRq = JSON.stringify(ChatReq)
    this._data.webServiceCall(ChatRq).subscribe(res => {
  if(res[0].login === 0){
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
  else{
  }
 });
    this.ReplyMessage = "";
}

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  //GetChat API CALL
  GetChat(){
    const GetChatReq = {
      requesttype:"getchat"
        }
    const ChatReq = JSON.stringify(GetChatReq)
    this._data.webServiceCall(ChatReq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.Message = res[0].chat;
      }
     });
  }
}
