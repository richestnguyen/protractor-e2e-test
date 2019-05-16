/**
 * Utilities for date and time
 */
export class DateTimeUtil {

    public static getNextDay(): Date {
     return new Date(new Date().setDate(1));
    }
}
