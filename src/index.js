const client = require('prom-client');
const Bowser = require('bowser');

const getBrowser = (ua) => {
    const browser = Bowser.getParser(ua);
    return browser.getBrowser();
};


module.exports = () => {
    const registry = new client.Registry();
    const testPassed = new client.Gauge({
        name: 'test_passed',
        help: 'Successfull passed tests',
        registers: [registry],
        labelNames: ['browser', 'version']
    });

    const testFailed = new client.Gauge({
        name: 'test_failed',
        help: 'Failed Tests',
        registers: [registry],
        labelNames: ['browser', 'version']
    });

    const testSkipped = new client.Gauge({
        name: 'test_skipped',
        help: 'Skipped Tests',
        registers: [registry]
    });

    const testTotal = new client.Gauge({
        name: 'test_total',
        help: 'Total Tests',
        registers: [registry]
    });

    const testTime = new client.Gauge({
        name: 'test_time_duration',
        help: 'The time it takes to run the tests in ms',
        registers: [registry]
    });

    return {
        noColors: true,

        reportTaskStart(startTime, userAgents, testCount) {
            testTotal.set(testCount, new Date(startTime));
            this.startTime = startTime;

            // We want to report per Browser
            this.userAgents = userAgents.map(ua => {
                const browser = getBrowser(ua);
                const res = { browser: browser.name };
                if (browser.version) {
                    res.version = browser.version;
                }
                return {
                    ua,
                    label: res
                };
            });

        },

        reportFixtureStart(name, path) {},

        reportTestDone(name, testRunInfo) {
            if (testRunInfo.skipped) {
                testSkipped.inc(1);
                return;
            }

            // No Error, means test has passed
            if (!testRunInfo.errs || testRunInfo.errs.length === 0) {
                this.userAgents.forEach(ua => {
                    testPassed.inc(ua.label, 1);
                });

                return;
            }

            // Figure out which browser passed and which did not
            this.userAgents.forEach(ua => {
                const error = testRunInfo.errs.find(err => err.userAgent === ua.ua);
                if (error) {
                    testPassed.inc(ua.label, 1);
                } else {
                    testFailed.inc(ua.label, 1);
                }
            });
        },

        reportTaskDone(endTime) {
            const durationMs = endTime - this.startTime;
            testTime.set(durationMs);

            this.write(registry.metrics());
        }
    };

};
