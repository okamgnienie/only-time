
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
