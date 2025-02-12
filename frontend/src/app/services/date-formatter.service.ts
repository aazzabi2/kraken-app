import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  constructor() {}

  static formatDate(excelDate: number): String {
    const startDate = new Date(Date.UTC(1899, 11, 30));
    const milliseconds = excelDate * 24 * 60 * 60 * 1000;
    const jsDate = new Date(startDate.getTime() + milliseconds);

    return new Date(
      jsDate.getFullYear(),
      jsDate.getMonth(),
      jsDate.getDate() + 1
    )
      .toISOString()
      .slice(0, 10);
  }
}
