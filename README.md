# only-time
Library for time conversion from 24 hours clock system to number of minutes and seconds.
Designed and used for transforming time before storing and after retrieving it from the database, when there is no need to store the whole date.
Using numbers instead of strings not only save memory, but also let you perform comparison operations faster.

**NOTE**: `toTime` method is now obsolete, instead use `fromMinutes` (backward compatibility is ensured).

## Installation
Install package via npm:
```
$ npm install --save only-time
```

## Usage
```javascript
// Create new instance:
var T = new OnlyTime();

// Convert from time to minutes:
T.toMinutes('01:01'); // -> 61

// Convert from minutes to time:
T.fromMinutes(61); // -> '01:01'

// Convert from time to seconds:
T.toSeconds('01:02:03'); // -> 3723

// Convert from seconds to time:
T.fromSeconds(3723); // -> '01:02:03'
```

## Separator
Default separator is set to `:`, but you can choose your own passing it as parameter while constructing object:
```javascript
var T = new OnlyTime('.');
```

## License
MIT
