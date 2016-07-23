# only-time
Library for time conversion from 24 hours clock system to number of minutes.
Designed and used for storing time in database.
Using numbers instead of strings not only saves memory, but also let you perform comparison operations.

## Usage
1. Create new instance `var Ot = new OnlyTime()`
2. Conversion from time to minutes `var Ot.toMinutes('01:01'); // -> 61`
3. Conversion from minutes to time `var Ot.toTime(61); // -> '01:01'`

## Separator
Default separator is set to `:`, but you can choose your own passing it as parameter while constructing object `var Ot = new OnlyTime('.')`

## License
MIT
