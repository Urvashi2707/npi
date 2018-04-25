import { Component, Input, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { NbMenuService, NbSidebarService,NbSearchService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  public name =sessionStorage.getItem('username');
  

  userMenu = [{ title: 'Profile' ,link: 'profile'}, { title: 'Log out',link: '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private searchService : NbSearchService,
              private analyticsService: AnalyticsService,
              private router:Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
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

  startSearch() {
    // this.analyticsService.trackEvent('onSearchSubmit');
    // console.log('Searching');
    this.searchService.onSearchSubmit().subscribe((data: { term: string, tag: string }) => {
      console.info(`term: ${data.term}, from search: ${data.tag}`);
      sessionStorage.setItem('search',data.term);
      window.location.reload();
      // this.router.navigateByUrl('pages/dashboard', { skipLocationChange: false });
      this.router.navigate(["pages/search"]);
      // this.router.navigate(['pages/search']);
  });
  // this.router.navigate(['/search']);
}
}
