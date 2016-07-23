
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
    ? String.prototype.concat(0, number)
    : number;
};

OnlyTime.prototype.toTime = function (minutes) {
  let modulo = minutes % 60;
  let hours = this.checkZero((minutes - modulo) / 60);
  return modulo === 0
    ? String.prototype.concat(hours, ':00')
    : String.prototype.concat(hours, ':', this.checkZero(modulo));
};
