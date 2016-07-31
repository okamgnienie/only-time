
/**
 * @author Przemyslaw Hardyn | przemyslawhardyn.com
 * Converting time to minutes or seconds and back.
 * https://github.com/phardyn/only-time
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
 * @description Update numbers below 10 with 0 upfront.
 * @param {integer} number
 * @returns {string}
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
  var hours = time.split(this.separator);
  return Number(hours[0]) * 60 + Number(hours[1]);
};

/**
 * @description Convert time to minutes.
 * Example: 129 -> '02:09'.
 * @param {integer} minutes
 * @returns {string}
 */
OnlyTime.prototype.toTime = function (minutes) {
  var modulo = minutes % 60;
  var hours = this.checkZero((minutes - modulo) / 60);
  return modulo === 0
    ? String.prototype.concat(hours, this.separator, '00')
    : String.prototype.concat(hours, this.separator, this.checkZero(modulo));
};
