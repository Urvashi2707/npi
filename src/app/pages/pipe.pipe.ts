
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnPipe'
})
export class columnPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let columnNames = [];
    for (var i = 0; i < value.length; i++) {
      for (let key in value[i]) {
        if (columnNames.indexOf(key) === -1) {
          columnNames.push(key);
        }
      }
    }
    return columnNames;
  }
} 

@Pipe({
  name: 'rowPipe'
})

export class rowPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let rowValues = Object.keys(value);
    return rowValues.map(k => value[k]);
  }
}

@Pipe({
  name: 'searchPipe'
})
export class searchPipe implements PipeTransform {
  transform(values: any[], filter: string): any {
    if (!values || !values.length) return [];
    if (!filter) return values;
    
    filter = filter.toUpperCase();
    
    if (filter && Array.isArray(values)) {
      const keys = Object.keys(values[0]);
      return values.filter(v => v && keys.some(k => v[k].toUpperCase().indexOf(filter) >= 0));
    }
  }
}