# testcafe-reporter-prometheus

This is the **prometheus** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).
It generates a a report as a file that can be collected by prometheus

## Sample Report

```
# HELP test_passed Successfull passed tests
# TYPE test_passed gauge
test_passed{browser="Chrome"} 5
test_passed{browser="Firefox",version="47"} 4

# HELP test_failed Failed Tests
# TYPE test_failed gauge
test_failed{browser="Chrome"} 1
test_failed{browser="Firefox",version="47"} 2

# HELP test_skipped Skipped Tests
# TYPE test_skipped gauge
test_skipped 1

# HELP test_total Total Tests
# TYPE test_total gauge
test_total 6 946684800000

# HELP test_time_duration The time it takes to run the tests in ms
# TYPE test_time_duration gauge
test_time_duration 925000
```

## Install

```
npm install testcafe-reporter-prometheus
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter prometheus
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('prometheus', 'prometheus.txt') // <-
    .run();
```
