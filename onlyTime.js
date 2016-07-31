
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
 * @description Add 0 upfront, return 00 or integer.
 * For formatting hours, minutes and seconds.
 * @param {integer} int
 * @returns {string}
 */
OnlyTime.prototype.format = function (int) {
  var n = String(int);

  if (int === 0) {
    n = '00';
  } else if (int < 10) {
    n = String.prototype.concat(0, int);
  }

  return n;
};

/**
 * @description Convert time to minutes.
 * Example: '12:12' -> 732
 * @param {string} time
 * @returns {integer}
 */
OnlyTime.prototype.toMinutes = function (time) {
  var t = time.split(this.separator);
  return Number(t[0]) * 60 + Number(t[1]);
};

/**
 * @description Convert time to seconds.
 * Example: '01:12:01' -> 4321
 * @param {string} time
 * @returns {integer}
 */
OnlyTime.prototype.toSeconds = function (time) {
  var t = time.split(this.separator);
  return Number(t[0]) * 3600 + Number(t[1]) * 60 + Number(t[2]);
};

/**
 * @description Convert minutes to time.
 * Example: 129 -> '02:09'
 * @param {integer} minutes
 * @returns {string}
 */
OnlyTime.prototype.fromMinutes = function (minutes) {
  var modulo = minutes % 60;
  return String.prototype.concat(
    this.format((minutes - modulo) / 60),
    this.separator,
    this.format(modulo)
  );
};

/**
 * @description Convert seconds to time.
 * Example: 3661 -> '01:01:01'
 * @param {integer} seconds
 * @returns {string}
 */
OnlyTime.prototype.fromSeconds = function (seconds) {
  var modulo = seconds % 60;
  return String.prototype.concat(
    this.fromMinutes((seconds - modulo) / 60),
    this.separator,
    this.format(modulo)
  );
};

/**
 * @description Alias to keep the backward compatibility.
 */
OnlyTime.prototype.toTime = OnlyTime.prototype.fromMinutes;
