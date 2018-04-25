import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card item-height="10px">
      <div class="details" style="display:inline-block;margin-top:8%">
      <div></div>
        <span class="title">{{ title }}</span>
        
        <span style="margin-left: 9%;font-size: 35px;margin-top: 10%;"></span>
      </div>
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  // @Input() icon:string;
  @Input() on = true;
}

