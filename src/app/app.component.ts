/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit ,isDevMode} from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService, NbSidebarService,NbSearchService } from '@nebular/theme';
import { ServicingService } from '../app/pages/services/addServicing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Credit:string;
  SvcId:string;

  constructor(private router: Router,private analytics: AnalyticsService,private menuService: NbMenuService, private ServicingService: ServicingService) {
    if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.analytics.trackPageViews();
    
  }


  }

