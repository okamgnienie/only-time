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

  const incorrectTimeSeconds = [
    `0${separator}0${separator}0`,
    `24${separator}00${separator}00`,
    `00${separator}60${separator}00`,
    `00${separator}00${separator}60`,
    `24${separator}60${separator}00`,
    `24${separator}00${separator}60`,
    `24${separator}60${separator}60`
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
  });
});
