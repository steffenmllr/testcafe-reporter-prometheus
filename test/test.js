const assert = require('assert');
const createReport = require('./utils/create-report');
const report = createReport(true);

const expected = `# HELP test_passed Successfull passed tests
# TYPE test_passed gauge
test_passed{browser="Chrome"} 5
test_passed{browser="Firefox",version="47"} 6

# HELP test_failed Failed Tests
# TYPE test_failed gauge
test_failed{browser="Chrome"} 1

# HELP test_skipped Skipped Tests
# TYPE test_skipped gauge
test_skipped 1

# HELP test_total Total Tests
# TYPE test_total gauge
test_total 6 946684800000

# HELP test_time_duration The time it takes to run the tests in ms
# TYPE test_time_duration gauge
test_time_duration 925000
`;

assert.strictEqual(expected, report, 'should generate report');
