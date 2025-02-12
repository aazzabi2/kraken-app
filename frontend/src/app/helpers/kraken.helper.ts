import { KrakenCategory } from '../enum/kraken-category.enum';
import { Kraken } from '../models/kraken.model';
import { DateFormatterService } from '../services/date-formatter.service';

export class KrakenHelper {
  static getDateFromData(item: Kraken): String {
    const date = this.findProperty(item, ['UpdatedOn', 'updated_on']);
    return date ? DateFormatterService.formatDate(date) : '';
  }

  static getCategoryFromData(item: Kraken): String {
    return this.findProperty(item, ['name', 'Name'])
      ?.toLowerCase()
      .startsWith(KrakenCategory.EQUIPEMENT)
      ? KrakenCategory.EQUIPEMENT
      : KrakenCategory.EQUIPEMENT;
  }

  static getRateFromData(item: Kraken): number {
    return parseFloat(this.findProperty(item, ['Rate %', 'rate']));
  }

  static getPricesFromData(item: Kraken): number[] {
    const pricesString = this.findProperty(item, ['Prices', 'prices']);

    const prices = (pricesString + '')
      .replace(/[:;]/g, ',')
      .split(',')
      .map((price: string) => {
        const num = parseFloat(price);
        return isNaN(num) ? 0 : num < 0 ? 0 : num;
      });

    return prices;
  }

  static findProperty(obj: any, propertyNames: string[]): any {
    for (const name of propertyNames) {
      if (obj.hasOwnProperty(name)) {
        return obj[name];
      }
      const lowerCaseName = name.toLowerCase();
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key.toLowerCase() === lowerCaseName) {
          return obj[key];
        }
      }
    }
    return undefined;
  }
}
