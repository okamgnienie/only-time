
/**
 * @file Converting time from 24 hours format ('22:22') to number of minutes
 * (1342) and back. Designed and used for storing time in database.
 * Using numbers instead of strings not only saves memory,
 * but also let you perform comparison operations.
 * @author Przemyslaw Hardyn
 * @example var Ot = new OnlyTime();
 *          Ot.toMinutes('01:01'); // -> 61
 *          Ot.toTime(61);         // -> '01:01'
 */


/**
 * @description Object constructor.
 * @param {string} [separator]
 */
function OnlyTime (separator) {
  this.separator = separator
    ? separator
    : ':';
}

/**
 * @description
 * @param {integer} number
 * @returns {}
 */
OnlyTime.prototype.checkZero = function (number) {
  return  number < 10
    ? String.prototype.concat(0, number)
    : number;
};

/**
 * @description Convert time to minutes.
 * Example: '12:12' -> 732.
 * @param {string} time
 * @returns {string}
 */
OnlyTime.prototype.toMinutes = function (time) {
  let hours = time.split(this.separator);
  return Number(hours[0]) * 60 + Number(hours[1]);
};

/**
 * @description Convert time to minutes.
 * Example: 129 -> '02:09'.
 * @param {integer} minutes
 * @returns {string}
 */
OnlyTime.prototype.toTime = function (minutes) {
  let modulo = minutes % 60;
  let hours = this.checkZero((minutes - modulo) / 60);
  return modulo === 0
    ? String.prototype.concat(hours, ':00')
    : String.prototype.concat(hours, ':', this.checkZero(modulo));
};
