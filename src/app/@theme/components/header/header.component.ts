import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NbMenuService, NbSidebarService,NbSearchService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { ServerService } from '../../../pages/services/user.service';
import { SearchComponent } from '../../../pages/search/search.component';
import { Subscription } from 'rxjs';
import { DataService } from '../../../pages/services/data.service';

@Component({
  providers:[SearchComponent],
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  //variables
  subscription: Subscription;
  Credit:number = 0;
  user: any;
  public name =sessionStorage.getItem('username');
  not:any[];
  notificationCount:number;
  brandid:string;
  show = false;
  message:any;
  Show_credit_Btn:boolean = true;
  noNotification : boolean = false;
  notification : any = [];
  today: number = Date.now();
  InsuranceCheck:boolean;
  userMenu = [{ title: 'Profile' ,link: 'profile'}, { title: 'Log out',link: '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private searchService : NbSearchService,
              private DataService:DataService,
              private analyticsService: AnalyticsService,
              private router:Router,
              private _data : ServerService,
              private route: ActivatedRoute) {
                this.DataService.getMessage().subscribe(message => { 
                  this.Credit = message.text;
                  sessionStorage.setItem('credit',message.text);
                  var show_btn = message.show_btn;
                  if(show_btn == "1"){
                    this.Show_credit_Btn = true;
                  }
                  else{
                    this.Show_credit_Btn = false;
                  }
                 });
                //  var Add_credit_flag = sessionStorage.getItem('show_credit_btn');
                //  var credit = JSON.parse(sessionStorage.getItem('credit'));
                //  console.log(Add_credit_flag,credit,"Add_credit_flag");
                //  if(credit != null){
                //    var balance = Number(credit);
                //    console.log(balance)
                //    this.Credit = parseFloat(balance.toFixed(2));
                //    console.log("credit12",this.Credit )
                //  }
                //  if(Add_credit_flag == "1"){
                //    this.Show_credit_Btn = true;
                //  }
                //  else{
                //    this.Show_credit_Btn = false;
                //  }
                var InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
                if(InsuranceUsr == "1"){
                  this.InsuranceCheck = true;
                }
                else{
                  this.InsuranceCheck = false;
                 }
                 console.log(this.InsuranceCheck,"InsuranceCheck")
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
      this.Credit = JSON.parse(sessionStorage.getItem('credit'));
    this.getNotification();
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
      this.router.navigate(["pages/search",  {'data': data.term}]);
     });
  }

  GoToNeft(){
  this.router.navigate(['pages/wallet/add-credit']);
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
