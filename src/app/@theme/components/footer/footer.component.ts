import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">© <b><a href="http://www.21north.in/" target="_blank">21North</a></b> 2018 v:2.12.9</span>
    <div>
    <div class="logo" *ngIf="brandid === '19' || brandid === '27' || brandid === '47' || brandid === '43'"><span style="padding-right: 17px;">Powered By :</span> <img src="/assets/images/logo.png" class="img-responsive" style="height: 25px;"></div>
    </div>
  `,
})
export class FooterComponent implements OnInit{
  brandid:string;
  
  ngOnInit() {
    this.brandid = sessionStorage.getItem('brandid');
  }
}
