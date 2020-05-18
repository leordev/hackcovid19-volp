import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    return `(${value.substr(0, 2)}) ${
      value.length > 10
        ? this.format9(value.substr(2))
        : this.format8(value.substr(2))
    }`;
  }

  private format8(value: string) {
    return value.substr(0, 4) + '-' + value.substr(4);
  }

  private format9(value: string) {
    return value.substr(0, 5) + '-' + value.substr(5);
  }
}
