/* global describe beforeEach it */

// Dependencies
const expect = require('chai').expect;
const assert = require('chai').assert;
const path = require('path');

// Subject
const OnlyTime = require(path.join(__dirname, 'only-time.js'));

describe('OnlyTime', () => {
  let T;

  const separator = '.';

  // Separator cannot be a digit and has to be one character
  const incorrectSeparators = ['1', -1, 12, '-1', '12', '::', '..'];

  // Minutes that are not in range [0, 1439]
  const incorrectMinutes = [-1, -14, -1234, 1500, 1231223];

  // Seconds that are not in range [0, 86399]
  const incorrectSeconds = [-1, -9, -3452, 86400, 3432434];

  const incorrectTimeMinutes = [
    `0${separator}0`,
    `24${separator}00`,
    `00${separator}60`,
    `24${separator}60`
  ];

  const correctTimeMinutes = [
    { time: `00${separator}00`, minutes: 0 },
    { time: `00${separator}01`, minutes: 1 },
    { time: `23${separator}59`, minutes: 1439 },
    { time: `12${separator}12`, minutes: 732 },
  ];

  const incorrectTimeSeconds = [
    `0${separator}0${separator}0`,
    `24${separator}00${separator}00`,
    `00${separator}60${separator}00`,
    `00${separator}00${separator}60`,
    `24${separator}60${separator}00`,
    `24${separator}00${separator}60`,
    `24${separator}60${separator}60`
  ];

  const correctTimeSeconds = [
    { time: `00${separator}00${separator}00`, seconds: 0 },
    { time: `00${separator}00${separator}01`, seconds: 1 },
    { time: `23${separator}59${separator}59`, seconds: 86399 },
    { time: `12${separator}12${separator}12`, seconds: 43932 }
  ];

  beforeEach(() => {
    T = new OnlyTime(separator);
  });

  it('validates the custom separator', () => {
    for (let i of incorrectSeparators) {
      assert.throws(
        () => { new OnlyTime(i); },
        Error,
        'Invalid separator - has to be one character and cannot be a digit.'
      );
    }
  });

  describe('OnlyTime.format', () => {
    it('formats digits with zero upfront', () => {
      const formatted = [...Array(11).keys()]
            .map(n => ({
              input: n,
              output: n < 10 ? `0${n}` : String(n)
            }));

      for (let f of formatted) {
        expect(T.format(f.input)).to.equal(f.output);
      }
    });
  });

  describe('OnlyTime.toMinutes', () => {
    it('validates input', () => {
      for (let i of incorrectTimeMinutes) {
        assert.throws(
          () => { T.toMinutes(i); },
          Error,
          `Invalid time with minutes: ${i}.`
        );
      }
    });

    it('converts properly time to number of minutes', () => {
      for (let t of correctTimeMinutes) {
        expect(T.toMinutes(t.time)).to.equal(t.minutes);
      }
    });
  });

  describe('OnlyTime.toSeconds', () => {
    it('validates input', () => {
      for (let i of incorrectTimeSeconds) {
        assert.throws(
          () => { T.toSeconds(i); },
          Error,
          `Invalid time with seconds: ${i}.`
        );
      }
    });

    it('converts properly time to number of seconds', () => {
      for (let t of correctTimeSeconds) {
        expect(T.toSeconds(t.time)).to.equal(t.seconds);
      }
    });
  });

  describe('OnlyTime.fromMinutes', () => {
    it('validates input', () => {
      for (let i of incorrectMinutes) {
        assert.throws(
          () => { T.fromMinutes(i); },
          Error,
          `only-time: Wrong number of minutes: ${i}. Should be in the range [0, 1439].`
        );
      }
    });

    it('converts properly number of minutes to time', () => {
      for (let t of correctTimeMinutes) {
        expect(T.fromMinutes(t.minutes)).to.equal(t.time);
      }
    });
  });

  describe('OnlyTime.fromSeconds', () => {
    it('validates input', () => {
      for (let i of incorrectSeconds) {
        assert.throws(
          () => { T.fromSeconds(i); },
          Error,
          `only-time: Wrong number of seconds: ${i}. Should be in the range [0, 86399].`
        );
      }
    });

    it('converts properly number of seconds to time', () => {
      for (let t of correctTimeSeconds) {
        expect(T.fromSeconds(t.seconds)).to.equal(t.time);
      }
    });
  });
});
