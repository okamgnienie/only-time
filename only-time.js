
/**
 * @author Przemyslaw Hardyn | przemyslawhardyn.com
 * Converting time to minutes, seconds and back.
 * https://github.com/phardyn/only-time
 */

class OnlyTime {

  /**
   * @desc Class constructor
   *
   * @param {string} [separator]
   */
  constructor(separator = ':') {
    if (separator && String(separator).length > 1 || !isNaN(separator)) {
      this.throwError(
        'Invalid separator - has to be one character and cannot be a digit.'
      );
    }

    this.separator = separator;
  }


  /**
   * @desc Add 0 upfront, return 00 or integer.
   * For formatting hours, minutes and seconds.
   *
   * @param {integer} int
   *
   * @returns {string}
   */
  format(int) {
    var n = `${int}`;

    if (int === 0) {
      n = '00';
    } else if (int < 10) {
      n = `0${int}`;
    }

    return n;
  }

  /**
   * @desc Convert time to minutes.
   * Example: '12:12' -> 732
   *
   * @param {string} time
   *
   * @returns {integer}
   */
  toMinutes(time) {
    this.checkTimeMinutes(time);
    let t = time.split(this.separator);
    return Number(t[0]) * 60 + Number(t[1]);
  }

  /**
   * @desc Convert time to seconds.
   * Example: '01:12:01' -> 4321
   *
   * @param {string} time
   *
   * @returns {integer}
   */
  toSeconds(time) {
    this.checkTimeSeconds(time);
    let t = time.split(this.separator);
    return Number(t[0]) * 3600 + Number(t[1]) * 60 + Number(t[2]);
  }

  /**
   * @desc Convert minutes to time.
   * Example: 129 -> '02:09'
   *
   * @param {integer} minutes
   *
   * @returns {string}
   */
  fromMinutes(minutes) {
    this.checkMinutes(minutes);
    let modulo = this.checkModulo(minutes);
    return String.prototype.concat(
      this.format((minutes - modulo) / 60),
      this.separator,
      this.format(modulo)
    );
  }

  /**
   * @desc Convert seconds to time.
   * Example: 3661 -> '01:01:01'
   *
   * @param {integer} seconds
   *
   * @returns {string}
   */
  fromSeconds(seconds) {
    this.checkSeconds(seconds);
    let modulo = this.checkModulo(seconds);
    return String.prototype.concat(
      this.fromMinutes((seconds - modulo) / 60),
      this.separator,
      this.format(modulo)
    );
  }

  /**
   * @desc Verify time modulo for minutes and seconds
   *
   * @param {integer} time
   *
   * @returns {number}
   */
  checkModulo(time) {
    return time % 60;
  }

  /**
   * @desc Check if number of minutes is valid.
   *
   * @param {integer} minutes
   */
  checkMinutes(minutes) {
    if (minutes < 0 || minutes > 1440) {
      this.throwError(
        `Wrong number of minutes: ${minutes}. Should be in the range [0, 1440].`
      );
    }
  }

  /**
   * @desc Check if number of seconds is valid.
   *
   * @param {integer} seconds
   */
  checkSeconds(seconds) {
    if (seconds < 0 || seconds > 86400) {
      this.throwError(
        `Wrong number of seconds: ${seconds}. Should be in the range [0, 86400].`
      );
    }
  };

  /**
   * @desc Check time string for errors.
   *
   * @param {string} time
   */
  checkTimeMinutes(time) {
    this.minutesTest = this.minutesTest
      ? this.minutesTest
      : new RegExp(`([01]\\d|2[0-3])\\${this.separator}([0-5]\\d)`);

    if (time.length !== 5 || !this.minutesTest.exec(time)) {
      this.throwError(`Invalid time with minutes: ${time}.`);
    }
  }

  /**
   * @desc Check time string with seconds for errors.
   *
   * @param {string} time
   */
  checkTimeSeconds(time) {
    this.secondsTest = this.secondsTest
      ? this.secondsTest
      : new RegExp(
        `([01]\\d|2[0-3])\\${this.separator}([0-5]\\d)\\${this.separator}([0-5]\\d)`
      );

    if (time.length !== 8 || !this.secondsTest.exec(time)) {
      this.throwError(`Invalid time with seconds:  ${time}.`);
    }
  }

  /**
   * @desc Throw custom only-time error in the console
   *
   * @param {string} reason
   */
  throwError(reason) {
    throw new Error(`only-time: ${reason}`);
  };


  /**
   * @desc Alias to keep the backward compatibility.
   *
   * @param {integer} minutes
   *
   * @returns {string}
   */
  toTime(minutes) {
    return this.fromMinutes(minutes);
  }
}
