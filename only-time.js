
/**
 * @author Przemyslaw Hardyn | przemyslawhardyn.com
 * Converting time to minutes, seconds and back.
 * https://github.com/phardyn/only-time
 */


/**
 * @description Object constructor.
 * @param {string} [separator]
 */
function OnlyTime (separator) {
  if (separator && String(separator).length > 1 || !isNaN(separator)) {
    throw new Error(
      'only-time: Invalid separator - has to be one character and cannot be a digit.'
    );
  }

  this.separator = separator ? separator : ':';
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
  this.checkTimeMinutes(time);
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
  this.checkTimeSeconds(time);
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
  this.checkMinutes(minutes);
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
  this.checkSeconds(seconds);
  var modulo = seconds % 60;
  return String.prototype.concat(
    this.fromMinutes((seconds - modulo) / 60),
    this.separator,
    this.format(modulo)
  );
};

/**
 * @description Check if number of minutes is valid.
 * @param {integer} minutes
 */
OnlyTime.prototype.checkMinutes = function (minutes) {
  if (minutes < 0 || minutes > 1440) {
    throw new Error(
      'only-time: Wrong number of minutes: ' +
      minutes +
      '. Should be in the range [0, 1440].'
    );
  }
};

/**
 * @description Check if number of seconds is valid.
 * @param {integer} seconds
 */
OnlyTime.prototype.checkSeconds = function (seconds) {
  if (seconds < 0 || seconds > 86400) {
    throw new Error(
      'only-time: Wrong number of seconds: ' +
      seconds +
      '. Should be in the range [0, 86400].'
    );
  }
};

/**
 * @description Check time string for errors.
 * @param {string} time
 */
OnlyTime.prototype.checkTimeMinutes = function (time) {
  this.minutesTest = this.minutesTest
    ? this.minutesTest
    : new RegExp(String.prototype.concat(
      '([01]\\d|2[0-3])\\', this.separator, '([0-5]\\d)'
    ));

  if (!this.minutesTest.exec(time)) {
    throw new Error('only-time: Invalid time: "' + time + '".');
  }
};

/**
 * @description Check time string with seconds for errors.
 * @param {string} time
 */
OnlyTime.prototype.checkTimeSeconds = function (time) {
  this.secondsTest = this.secondsTest
    ? this.secondsTest
    : new RegExp(String.prototype.concat(
      '([01]\\d|2[0-3])\\', this.separator, '([0-5]\\d)\\', this.separator, '([0-5]\\d)'
    ));

  if (!this.secondsTest.exec(time)) {
    throw new Error('only-time: Invalid time with seconds: "' + time + '".');
  }
};

/**
 * @description Alias to keep the backward compatibility.
 */
OnlyTime.prototype.toTime = OnlyTime.prototype.fromMinutes;
