export class RVP {

  public static getRandomAlphaNumeric(length: number): string {
    let result = 'Str_';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    while (length - result.length > 0) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
  }

  public static getRandomNumeric(length: number): string {
    let result = '';
    const possible = '0123456789';

    for (let i = 0; i < length; i++) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
  }

  public static getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  // max exclusive
  // returns 0 bis (max-1)
  public static getRandomNumber(maxValue?: number): number {
    const MAX_INT_32_BIT = 2147483647;
    const usedMax = (maxValue != null) ? maxValue : MAX_INT_32_BIT;
    return Math.floor(Math.random() * usedMax);
  }

  public static getRandomPercent(): number {
    return 1 + this.getRandomNumber(98) + (this.getRandomNumber(9) / 10) + (this.getRandomNumber(9) / 100);
  }

  public static getRandomMoneyValue(): number {
    return this.getRandomNumber(1000) + 100 + this.getRandomNumber(99) / 100;
  }

  // public static getRandomTagMonatJahr(): string {
  //   return DateFormatter.DATE_FORMAT_TAG_MONAT_JAHR.format(this.createRandomDate());
  // }

  // public static getRandomLocalDate(): LocalDate {
  //   return new LocalDate(this.createRandomDate());
  // }

  public static createRandomDate(): Date {
    return new Date(1900 + RVP.getRandomNumber(100), RVP.getRandomNumber(11), 1 + RVP.getRandomNumber(27));
  }

  public static createRandomDateWithTime(): Date {
    return new Date(
      RVP.getRandomNumber(100) + 1900,
      RVP.getRandomNumber(11),
      RVP.getRandomNumber(27) + 1,
      RVP.getRandomNumber(23),
      RVP.getRandomNumber(59),
      RVP.getRandomNumber(59));
  }

  // public static createRandomLocalDate(): bl.base.basistypen.LocalDate {
  //   return new bl.base.basistypen.LocalDate(this.createRandomDate());
  // }

  public static getRandomEntry(list: any[]): any {
    return list[Math.floor(Math.random() * list.length)];
  }

  // public static getOtherRandomEntry(list: any[], ohne: any): any {
  //   ArrayUtils.remove(list, ohne);
  //   return this.getRandomEntry(list);
  // }

  // public static getOtherRandomEnum(ohne: EnumType): any {
  //   return this.getOtherRandomEntry(ohne.values(), ohne);
  // }

  public static getNullOrUndefined(): any {
    return this.getRandomBoolean() ? null : undefined;
  }

}
