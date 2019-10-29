import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findValue', pure: true })
export class FindValuePipe implements PipeTransform {
  transform(data: any, id: any, language: string): any {
    let value = null;

    if (data) {
      value = data.find(cat => cat.id === id);
    }

    if (!value) {
      value = '';
    }

    if (language) {
      return language === 'en' ? value.nameEn : value.nameFr;
    } else {
      return value;
    }
  }
}
