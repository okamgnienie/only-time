# only-time
Library for time conversion from 24 hours clock system to number of minutes.
Designed and used for storing time in database.
Using numbers instead of strings not only saves memory, but also let you perform comparison operations.

## Installation
Install package via npm:
```
$ npm install --save only-time
```

## Usage
```javascript
// Create new instance:
var Ot = new OnlyTime();

// Convert from time to minutes:
Ot.toMinutes('01:01'); // -> 61

// Convert from minutes to time:
Ot.toTime(61); // -> '01:01'
```

## Separator
Default separator is set to `:`, but you can choose your own passing it as parameter while constructing object
```javascript
var Ot = new OnlyTime('.');
```

## License
MIT
