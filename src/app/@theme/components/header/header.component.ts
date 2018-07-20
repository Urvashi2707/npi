import { Component, Input, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NbMenuService, NbSidebarService,NbSearchService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {ServerService} from '../../../pages/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';


  credit:string;
  user: any;
  public name =sessionStorage.getItem('username');
  not:any[];
  notificationCount:number;
  brandid:string;
  show = false;
  message:any;
  noNotification : boolean = false;
  notification : any = [];
  today: number = Date.now();
  userMenu = [{ title: 'Profile' ,link: 'profile'}, { title: 'Log out',link: '/auth/logout'}];
  notifications = [{"notifications":
                      [{
                        "id":"1",
                        "release_date":"2018-05-21",
                        "title":"This is the Title",
                        "description":"This is a test Notification.",
                        "is_viewed":"0"
                      },
                      {
                        "id":"2",
                        "release_date":"2018-05-25",
                        "title":"This is the Title2",
                        "description":"This is a test Notification2s.",
                        "is_viewed":"0"
                      },
                      {
                        "id":"3",
                        "release_date":"2018-05-25",
                        "title":"This is the Title3",
                        "description":"This is a test Notification3.",
                        "is_viewed":"0"
                      }]
                    }]

                  
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private searchService : NbSearchService,
              private datePipe:DatePipe,
              private analyticsService: AnalyticsService,
              private router:Router,
              private _data : ServerService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
      this.credit = JSON.parse(sessionStorage.getItem('credit'));
    this.getNotification();
    this.not = this.notifications[0].notifications;
    this.brandid = sessionStorage.getItem('brandid');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  shownotification(){}

  toggled(event:any){
    if(event){
      const reqpara4 = {
        requesttype: 'markread'
          }
      const as4 = JSON.stringify(reqpara4)
      this._data.webServiceCall(as4).subscribe(res => {
        if(res[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{ }
         });
    }
  }

  startSearch() {
    this.searchService.onSearchSubmit().subscribe((data: { term: string, tag: string }) => {
      console.info(`term: ${data.term}, from search: ${data.tag}`);
      sessionStorage.setItem('search',data.term);
      window.location.reload();
      this.router.navigate(["pages/search"]);
 
  });
}


getNotification(){
  const reqpara3 = {
    requesttype: 'getnotifications'
      }
  const as3 = JSON.stringify(reqpara3)
  this._data.webServiceCall(as3).subscribe(res => {
    if(res[0].login === 0){
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    }
    else{
      this.notification = res[0].notifications;
      this.notificationCount = this.notification.length;
    }
   });
}


}
