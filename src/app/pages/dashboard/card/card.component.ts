import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  template: `

    <nb-card item-height="80">
      <nb-card-header>
        <div class="details">
          <div class="title">{{ title }}</div>
        </div>
      </nb-card-header>
    <nb-card-body>
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
      </nb-card-body>
    </nb-card>
  `,

})
export class CardComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

}
