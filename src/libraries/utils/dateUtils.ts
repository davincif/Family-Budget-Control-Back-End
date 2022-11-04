export class DateUtils {
  /**
   * Get a javascript Date object from a date string
   * @param dateString a string date with the format: YYYY-MM-DD
   */
  public static dateStringToDate(dateString: string): Date {
    return new Date(`${dateString}T00:00:00`);
  }

  /**
   * Check if the given date is a valid Date object
   * @param date Date object to be checked
   */
  public static isValidDate(date: Date) {
    return date instanceof Date;
  }

  /**
   * Check's if the given date is in a point in the future relate do now
   * @param date date to be teste if is in the future or not
   * @param now the current datetime (cam be omitted)
   */
  public static isInTheFuture(date: Date, now = new Date()) {
    return date > now;
  }
}
