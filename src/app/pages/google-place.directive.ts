import { Directive, ElementRef,OnInit, Output, EventEmitter } from '@angular/core';
import {} from '@types/googlemaps';
// const google = require('@types/googlemaps');
declare var google: any;
@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    setTimeout(()=> {
        const autocomplete = new google.maps.places.Autocomplete(this.element);
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
          });
        }, 1000);
   }

   getFormattedAddress(place) {
    let location_obj = {};
    console.log(place.geometry.location.lat(),"lat");
    console.log(place.geometry.location.lng(),"lng");
    location_obj['lat'] = place.geometry.location.lat();
    location_obj['long'] = place.geometry.location.lng();
    for (let i in place.address_components) {
      let item = place.address_components[i];
      
      location_obj['formatted_address'] = place.formatted_address;
      if(item['types'].indexOf("locality") > -1) {
        location_obj['locality'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['admin_area_l1'] = item['short_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['route'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['postal_code'] = item['short_name']
      }
     
    }
    console.log(location_obj);
    return location_obj;
  }


}
