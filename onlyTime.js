
function OnlyTime (separator) {
  this.separator = separator
    ? separator
    : ':';
}

OnlyTime.prototype.toMinutes = function (time) {
  let hours = time.split(this.separator);
  return Number(hours[0]) * 60 + Number(hours[1]);
};

OnlyTime.prototype.checkZero = function (number) {
  return  number < 10
    ? `0${number}`
    : number;
};

OnlyTime.prototype.toTime = function (minutes) {
  let modulo = minutes % 60;
  return modulo === 0
    ? `${ this.checkZero(minutes / 60) }:00`
    : `${ this.checkZero((minutes - modulo) / 60) }:${ this.checkZero(modulo) }`;
};
