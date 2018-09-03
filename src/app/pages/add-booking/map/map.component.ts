import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  ngOnInit(){}

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
