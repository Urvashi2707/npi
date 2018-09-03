/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService, NbSidebarService,NbSearchService } from '@nebular/theme';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private menuService: NbMenuService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }

    
}
