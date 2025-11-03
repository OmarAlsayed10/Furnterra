import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'longDate'
})
export class LongDatePipe implements PipeTransform {

  transform(value: string|Date): string {
    const date = new Date(value)
    return date.toLocaleDateString("en-GB",{
      day:"2-digit",
      month:"long",
      year:"numeric"
    })
  }

}
